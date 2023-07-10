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
          <Button w="100%" leftIcon={<RiKakaoTalkFill />} colorScheme="yellow">
            Continue with Kakao
          </Button>
          <Button w="100%" leftIcon={<SiNaver />} colorScheme="green">
            Continue with Naver
          </Button>
        </VStack>
      </LightMode>
    </Box>
  );
};

export default SocialLogin;
