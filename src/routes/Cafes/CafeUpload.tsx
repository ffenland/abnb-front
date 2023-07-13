import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import DaumPostcodeEmbed, { type Address } from "react-daum-postcode";
import { useHostOnly, useProtectPage } from "../../libs/authHooks";

const CafeUpload = () => {
  useProtectPage();
  useHostOnly();
  const {
    onOpen: onAddressOpen,
    onClose: onAddressClose,
    isOpen: isAddressOpen,
  } = useDisclosure();
  const onAddressComplete = (data: Address) => {
    return;
  };
  return (
    <Box
      pb={40}
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
    >
      <Container>
        <Heading textAlign={"center"}>Upload Cafe</Heading>
        <VStack spacing={5} as="form">
          <FormControl>
            <FormLabel>상호명</FormLabel>
            <Input type="text" />
            <FormHelperText>카페의 이름을 입력해주세요.</FormHelperText>
          </FormControl>
          <FormControl>
            <Button size={"sm"} onClick={onAddressOpen}>
              주소입력
            </Button>
          </FormControl>
        </VStack>
      </Container>
      <Modal onClose={onAddressClose} isOpen={isAddressOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <DaumPostcodeEmbed
              onComplete={(data: Address) => {
                onAddressComplete(data);
                onAddressClose();
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default CafeUpload;
