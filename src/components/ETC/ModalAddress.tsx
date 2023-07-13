const ModalAddress = () => {
  return (
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
  );
};
export default ModalAddress;
