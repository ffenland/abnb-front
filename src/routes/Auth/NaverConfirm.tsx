import { Heading, Spinner, Text, VStack, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { naverLogin } from "../../libs/api";

const NaverConfirm = () => {
  const { search } = useLocation();
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const confirmLogin = async () => {
    const params = new URLSearchParams(search);
    const code = params.get("code");
    if (code) {
      const status = await naverLogin(code);
      if (status === 200) {
        // Success
        toast({
          status: "success",
          title: "로그인 성공",
          description: "환영합니다~",
        });
        queryClient.refetchQueries(["me"]);
        navigate("/");
      }
    }
  };
  useEffect(() => {
    confirmLogin();
  }, []);

  return (
    <VStack justifyContent={"center"} mt={"20"}>
      <Heading size={"lg"}>네이버로 로그인합니다...</Heading>
      <Text>네이버가 좀 느리네요...</Text>
      <Spinner size="xl" />
    </VStack>
  );
};
export default NaverConfirm;
