import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { User } from '@prisma/client';
import React, { useState } from 'react';
import { useCurrentUser } from '@/hooks/session';
import { Maybe, MutationPutUserArgs, usePutUserMutation } from '@/types/graphql';

enum Steps {
  USERNAME = 1,
  TITLE = 2,
  DONE = 3,
}

const getDefaultStep = (user?: Maybe<User>) => {
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
    <Modal size="full" isOpen={isOpen} closeOnOverlayClick={false} onClose={() => null}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Center>
            <Heading>Season 15: Episode 1 - The Mortylorian</Heading>
          </Center>
        </ModalHeader>
        <ModalBody>
          <AbsoluteCenter>
            <Box>
              <Heading size="md">
                {step === Steps.USERNAME && `State your username`}
                {step === Steps.TITLE && 'State your space name/title'}
                {step === Steps.DONE && `Welcome ${username}, a.k.a. ${title}`}
              </Heading>
            </Box>
            <Box mt={4}>
              {step === Steps.USERNAME && (
                <Input
                  size="lg"
                  type="text"
                  placeholder="xx_space_beth_xx"
                  defaultValue={username}
                  onChange={(e) => setUserName(e.target.value)}
                />
              )}
              {step === Steps.TITLE && (
                <Input
                  size="lg"
                  type="text"
                  placeholder="Space Monger"
                  defaultValue={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              )}
            </Box>
          </AbsoluteCenter>
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
