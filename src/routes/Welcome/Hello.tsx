import { Box, Container, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import SocialLogin from "../../components/Auth/SocialLogin";
import { Outlet } from "react-router-dom";

const Hello = () => {
  return (
    <Container
      maxWidth={{
        base: "container.sm",
        md: "container.lg",
      }}
      bgColor={"red.100"}
    >
      <Flex h={"100vh"} py={20} direction={{ base: "column", md: "row" }}>
        <VStack
          w="full"
          h="full"
          p={10}
          spacing={10}
          alignItems={"flex-start"}
          bg={"green.100"}
        >
          <Heading>만나서 반갑습니다.</Heading>
        </VStack>
        <VStack
          w="full"
          h="full"
          p={10}
          spacing={10}
          alignItems={"flex-start"}
          bg={"blackAlpha.300"}
        >
          <Text>hi</Text>
          <SocialLogin />
        </VStack>
      </Flex>

      <Outlet />
    </Container>
  );
};

export default Hello;
