'use client';

import { Heading, Button, Center } from '@chakra-ui/react';

export default function ChosenState({ correct }: { correct: boolean }) {
  return (
    <Center flexDirection="column" gap={5}>
      <Heading>{correct ? 'Correct!' : 'Wrong!'}</Heading>
      <Button onClick={() => window.location.reload()}>Next</Button>
    </Center>
  );
}
