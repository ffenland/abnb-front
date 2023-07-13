import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: Address) => void;
}

const ModalAddress = ({ onClose, isOpen, onComplete }: ModalProps) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <DaumPostcodeEmbed
            onComplete={(data: Address) => {
              onComplete(data);
              onClose();
            }}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default ModalAddress;
