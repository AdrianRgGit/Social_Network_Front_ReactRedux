import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

const ModalRender = ({
  onCloseButtonVisible = false,
  secondaryButtonVisible = false,
  text = "I am a modal",
  textBtn = "Click",
  modalTitle = "Modal Title"
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button className="btn-card" onClick={onOpen}>{textBtn}</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{text}</ModalBody>

          <ModalFooter>
            {onCloseButtonVisible && (
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            )}

            {secondaryButtonVisible && (
              <Button variant="ghost">Secondary Action</Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalRender;
