import {
  Box,
  Button,
  HStack,
  IconButton,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import LoginModal from "./Auth/LoginModal";
import SignUpModal from "./Auth/SignUpModal";
import { Link } from "react-router-dom";

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
        <Button onClick={onLoginOpen}>Log in</Button>
        <Button onClick={onSignupOpen} colorScheme="yellow">
          Sign up
        </Button>
      </HStack>
      <LoginModal onClose={onLoginClose} isOpen={isLoginOpen} />
      <SignUpModal onClose={onSignupClose} isOpen={isSignupOpen} />
    </Stack>
  );
};
export default Header;
