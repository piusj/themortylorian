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
import { useState } from 'react';
import StepDoneBody from '@/components/WelcomeModal/StepDoneBody';
import StepTitleBody from '@/components/WelcomeModal/StepTitleBody';
import StepUsernameBody from '@/components/WelcomeModal/StepUsernameBody';
import { useCurrentUser } from '@/hooks/session';
import { Prisma } from '@/lib/prisma';
import { Maybe, MutationPutUserArgs, usePutUserMutation } from '@/types/graphql';

enum Steps {
  USERNAME = 1,
  TITLE = 2,
  DONE = 3,
}

const getDefaultStep = (user?: Maybe<Prisma.User>) => {
  // return Steps.USERNAME;

  if (!user?.username) return Steps.USERNAME;
  if (!user?.title) return Steps.TITLE;
  return Steps.DONE;
};

export default function WelcomeModal() {
  const { user, updateUser } = useCurrentUser();
  const [username, setUserName] = useState(user?.username || undefined);
  const [title, setTitle] = useState(user?.title || undefined);
  const [step, setStep] = useState(getDefaultStep(user));
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: step !== Steps.DONE });
  const [loading, setLoading] = useState(false);
  // todo: Consider wrapping mutations in hook with error handling
  const [saveUser] = usePutUserMutation();

  if (!user) return null;

  async function handleSaveUser(variables: MutationPutUserArgs) {
    setLoading(true);

    const { data } = await saveUser({ variables });

    if (data?.putUser) {
      await updateUser({
        username: data?.putUser.username,
        title: data?.putUser.title,
      });
    }

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
    <Modal isOpen={isOpen} onClose={() => null}>
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

const BlueButton = ({ ...props }) => <Button colorScheme="blue" {...props} />;
