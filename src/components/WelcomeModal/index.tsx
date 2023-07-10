import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useCurrentUser } from '@/hooks/session';
import { useState } from 'react';
import StepUsernameBody from '@/components/WelcomeModal/StepUsernameBody';
import StepTitleBody from '@/components/WelcomeModal/StepTitleBody';
import StepDoneBody from '@/components/WelcomeModal/StepDoneBody';

enum Steps {
  USERNAME = 1,
  TITLE = 2,
  DONE = 3,
}

const getDefaultStep = (user) => {
  if (!user.username) return Steps.USERNAME;
  if (!user.title) return Steps.TITLE;
  return Steps.DONE;
};

export default function WelcomeModal() {
  const user = useCurrentUser();

  if (!user) return null;

  const defaultStep = getDefaultStep(user);
  const defaultIsOpen = defaultStep !== Steps.DONE;

  const { isOpen, onClose } = useDisclosure({ defaultIsOpen });
  const [step, setStep] = useState(defaultStep);

  function handleNextStep() {
    setStep(step + 1);
  }

  return (
    <Modal isOpen={isOpen}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalBody>
          {step === Steps.USERNAME && <StepUsernameBody />}
          {step === Steps.TITLE && <StepTitleBody />}
          {step === Steps.DONE && <StepDoneBody />}
        </ModalBody>

        <ModalFooter>
          {step === Steps.DONE ? (
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Done
            </Button>
          ) : (
            <Button colorScheme="blue" mr={3} onClick={handleNextStep}>
              Next
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
