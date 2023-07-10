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
import { useMutation } from '@apollo/client';
import PutUser from '@/lib/graphql/queries/PutUser.graphql';

enum Steps {
  USERNAME = 1,
  TITLE = 2,
  DONE = 3,
}

const getDefaultStep = (user) => {
  return Steps.USERNAME;

  if (!user.username) return Steps.USERNAME;
  if (!user.title) return Steps.TITLE;
  return Steps.DONE;
};

export default function WelcomeModal() {
  const [user, updateUser] = useCurrentUser();

  if (!user) return null;

  const defaultStep = getDefaultStep(user);
  const [username, setUserName] = useState(user.username);
  const [title, setTitle] = useState(user.title);
  const [step, setStep] = useState(defaultStep);
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: defaultStep !== Steps.DONE });
  const [loading, setLoading] = useState(false);
  // todo: Consider wrapping mutations in hook with error handling
  const [saveUser] = useMutation(PutUser);

  async function handleSaveUser(variables) {
    setLoading(true);

    const newUserValues = await saveUser({ variables });
    await updateUser(newUserValues);

    setLoading(false);
  }

  async function handleNextStep() {
    if (step === Steps.USERNAME) {
      await handleSaveUser({ username });
    } else if (step === Steps.TITLE) {
      await handleSaveUser({ title });
    }

    setStep(step + 1);
  }

  return (
    <Modal isOpen={isOpen} onClose={null}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>

        <ModalBody>
          {step === Steps.USERNAME && (
            <StepUsernameBody defaultValue={username} setUserName={setUserName} />
          )}
          {step === Steps.TITLE && <StepTitleBody defaultValue={title} setTitle={setTitle} />}
          {step === Steps.DONE && <StepDoneBody />}
        </ModalBody>

        <ModalFooter>
          {step === Steps.DONE ? (
            <BlueButton onClick={onClose}>Done</BlueButton>
          ) : (
            <BlueButton onClick={handleNextStep} isLoading={loading}>
              Next
            </BlueButton>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

const BlueButton = (props) => <Button colorScheme="blue" {...props} />;
