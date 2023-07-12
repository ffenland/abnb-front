import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { RiUser5Fill } from "react-icons/ri";
import { FaLock } from "react-icons/fa";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usernameLogin } from "../../libs/api";
import type {
  IUsernameLoginFailure,
  IUsernameLoginSuccess,
  IUsernameLoginVariables,
} from "../../types";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LoginForm {
  username: string;
  password: string;
}

const LoginModal = ({ onClose, isOpen }: LoginModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginForm>();
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation<
    IUsernameLoginSuccess,
    IUsernameLoginFailure,
    IUsernameLoginVariables
  >(usernameLogin, {
    onMutate: () => {
      console.log("Mutation starts");
    },
    onSuccess: (data) => {
      toast({
        title: "LoginSuccess",
        status: "success",
      });
      console.log("Mutation Success");
      queryClient.refetchQueries(["me"]);
      onClose();
      reset();
    },
    onError: (error) => {
      console.log("Mutation Failed");
    },
  });
  const onValid = ({ username, password }: LoginForm) => {
    mutation.mutate({ username, password });
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Log in</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit(onValid)}>
          <VStack>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <RiUser5Fill />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.username)}
                {...register("username", {
                  required: "Please write Username",
                })}
                variant={"filled"}
                placeholder="Username"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaLock />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.password)}
                {...register("password", {
                  required: "Please write Password",
                })}
                variant={"filled"}
                placeholder="Password"
                type="password"
              />
            </InputGroup>
          </VStack>
          {mutation.isError ? (
            <Text color={"red.500"} fontSize={"small"}>
              Username or Password are wrong
            </Text>
          ) : null}
          <Button
            isLoading={mutation.isLoading}
            type="submit"
            mt={4}
            w="100%"
            colorScheme="red"
          >
            Login
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
