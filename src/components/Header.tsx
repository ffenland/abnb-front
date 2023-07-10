import {
  Box,
  Button,
  HStack,
  IconButton,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import LoginModal from "./Auth/LoginModal";
import SignUpModal from "./Auth/SignUpModal";

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
  const { colorMode, toggleColorMode } = useColorMode();
  const logoColor = useColorModeValue("pink.500", "pink.200");
  const ColoredIcon = useColorModeValue(FaMoon, FaSun);
  return (
    <HStack
      py={5}
      px={40}
      borderBottomWidth={1}
      justifyContent={"space-between"}
    >
      <Box color={logoColor}>
        <FaAirbnb size={"40"} />
      </Box>
      <HStack spacing={2}>
        <IconButton
          onClick={toggleColorMode}
          aria-label="Toggle dark mode"
          icon={<ColoredIcon />}
          variant={"ghost"}
        />
        <Button onClick={onLoginOpen}>Log in</Button>
        <Button onClick={onSignupOpen} colorScheme="yellow">
          Sign up
        </Button>
      </HStack>
      <LoginModal onClose={onLoginClose} isOpen={isLoginOpen} />
      <SignUpModal onClose={onSignupClose} isOpen={isSignupOpen} />
    </HStack>
  );
};
export default Header;
