'use client';

import { Heading, Button, Center } from '@chakra-ui/react';
import { CharacterCard } from '@/components/CharacterCard';
import { Character } from '@/types/graphql';

export default function ChosenState({ correct, spy }: { correct: boolean; spy: Character }) {
  return (
    <Center flexDirection="column" gap={5}>
      {correct ? (
        <>
          <Heading color="green.500">Genius! Morty would have got it wrong for sure!</Heading>
          <Heading size="md">This is the spy&apos;s real ID</Heading>
        </>
      ) : (
        <>
          <Heading color="red.500">Jesus! Yyyy... y... you killed an innocent being!</Heading>
          <Heading size="md">This is the actual spy, dummy</Heading>
        </>
      )}

      <CharacterCard character={spy} chooseCharacter={() => window.location.reload()} />
      <Button onClick={() => window.location.reload()}>
        {correct ? 'Keep going' : 'Try again'}
      </Button>
    </Center>
  );
}
