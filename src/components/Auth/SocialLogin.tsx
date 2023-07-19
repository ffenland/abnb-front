import {
  Box,
  Button,
  Divider,
  HStack,
  LightMode,
  Text,
  VStack,
} from "@chakra-ui/react";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";
const SocialLogin = () => {
  const naverParams = new URLSearchParams({
    response_type: "code",
    client_id: process.env.REACT_APP_NAVER_CLIENT_ID!,
    redirect_uri:
      process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_NAVER_REDIRECT_URI_DEV!
        : process.env.REACT_APP_NAVER_REDIRECT_URI!,
    state: process.env.REACT_APP_NAVER_STATE!,
  }).toString();

  const kakaoParams = new URLSearchParams({
    response_type: "code",
    client_id: process.env.REACT_APP_KAKAO_CLIENT_ID!,
    redirect_uri:
      process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_KAKAO_REDIRECT_URI_DEV!
        : process.env.REACT_APP_KAKAO_REDIRECT_URI!,
  }).toString();

  return (
    <Box mb={4}>
      <HStack my={8}>
        <Divider />
        <Text fontSize={"xs"} as="b">
          Or
        </Text>
        <Divider />
      </HStack>
      <LightMode>
        <VStack>
          <Button
            as="a"
            href={`https://kauth.kakao.com/oauth/authorize?${kakaoParams}`}
            w="100%"
            leftIcon={<RiKakaoTalkFill />}
            colorScheme="yellow"
          >
            Continue with Kakao
          </Button>
          <Button
            as="a"
            href={`https://nid.naver.com/oauth2.0/authorize?${naverParams}`}
            w="100%"
            leftIcon={<SiNaver />}
            colorScheme="green"
          >
            Continue with Naver
          </Button>
        </VStack>
      </LightMode>
    </Box>
  );
};

export default SocialLogin;
