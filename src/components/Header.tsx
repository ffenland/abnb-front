import {
  Avatar,
  Box,
  Button,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  ToastId,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import LoginModal from "./Auth/LoginModal";
import SignUpModal from "./Auth/SignUpModal";
import { Link } from "react-router-dom";
import useUser from "../libs/useUser";
import { logOut } from "../libs/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";

const Header = () => {
  const {
    onOpen: onLoginOpen,
    onClose: onLoginClose,
    isOpen: isLoginOpen,
  } = useDisclosure();
  const {
    onOpen: onSignupOpen,
    onClose: onSignupClose,
    isOpen: isSignupOpen,
  } = useDisclosure();
  const { toggleColorMode } = useColorMode();
  const logoColor = useColorModeValue("pink.500", "pink.200");
  const ColoredIcon = useColorModeValue(FaMoon, FaSun);
  const toast = useToast();
  const toastId = useRef<ToastId>();
  const queryClient = useQueryClient();
  const mutation = useMutation(logOut, {
    onMutate: () => {
      toastId.current = toast({
        title: "Logout...",
        status: "loading",
      });
    },
    onSuccess: () => {
      if (toastId.current) {
        toast.update(toastId.current, {
          title: "안녕히 가세요.",
          description: "성공적으로 로그아웃 되었습니다.",
          status: "success",
        });
      }
      queryClient.refetchQueries(["me"]);
    },
  });
  const { userLoading, user, isLoggedIn } = useUser();
  const onLogout = async () => {
    mutation.mutate();
  };
  return (
    <Stack
      py={5}
      px={{
        md: 10,
        lg: 40,
      }}
      direction={{
        sm: "column",
        md: "row",
      }}
      alignItems={"center"}
      spacing={{
        sm: 4,
        md: 0,
      }}
      borderBottomWidth={1}
      justifyContent={"space-between"}
    >
      <Link to="/">
        <Box color={logoColor}>
          <FaAirbnb size={"40"} />
        </Box>
      </Link>
      <HStack spacing={2}>
        <IconButton
          onClick={toggleColorMode}
          aria-label="Toggle dark mode"
          icon={<ColoredIcon />}
          variant={"ghost"}
        />
        {!userLoading ? (
          !isLoggedIn || !user ? (
            <>
              <Button onClick={onLoginOpen}>Log in</Button>
              <Button onClick={onSignupOpen} colorScheme="yellow">
                Sign up
              </Button>
            </>
          ) : (
            <Menu>
              <MenuButton>
                <Avatar size={"md"} name={user.username} src={user.avatar} />
              </MenuButton>
              <MenuList>
                {user.isHost ? (
                  <Link to="/cafes/upload">
                    <MenuItem>
                      <Text>Upload your cafe</Text>
                    </MenuItem>
                  </Link>
                ) : null}
                <MenuItem onClick={onLogout}>
                  <Text>Logout</Text>
                </MenuItem>
              </MenuList>
            </Menu>
          )
        ) : null}
      </HStack>
      <LoginModal onClose={onLoginClose} isOpen={isLoginOpen} />
      <SignUpModal onClose={onSignupClose} isOpen={isSignupOpen} />
    </Stack>
  );
};
export default Header;
