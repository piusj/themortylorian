'use client';

import { Center, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import DataError from '../../components/Errors/DataError';
import GraphQLError from '../../components/Errors/GraphQLError';
import { CharacterCard } from '@/components/CharacterCard';
import ChosenState from '@/components/ChosenState';
import Loading from '@/components/Loading';
import { useCurrentUser } from '@/hooks/session';
import { useGenerateScenario } from '@/hooks/useGenerateScenario';
import { Character, Maybe, usePutGameResultMutation } from '@/types/graphql';

export default function Game() {
  const { updateUser } = useCurrentUser();
  const { loading, error, data } = useGenerateScenario();
  const [saveGameResult] = usePutGameResultMutation();
  const [chosenSpy, setChosenSpy] = useState<Maybe<Character>>(null);
  const [wasCorrect, setWasCorrect] = useState<boolean>(false);

  if (loading) return <Loading />;
  if (error) return <GraphQLError error={error} />;
  if (!data) return <DataError />;

  const { characters, spy } = data;

  async function chooseCharacter(id: string) {
    const isCorrect = id === spy.id;

    setChosenSpy(spy);
    setWasCorrect(isCorrect);

    const { data } = await saveGameResult({ variables: { isCorrect } });

    if (data?.putGameResult) {
      await updateUser({
        currentStreak: data.putGameResult.currentStreak,
      });
    }
  }

  if (chosenSpy) return <ChosenState correct={wasCorrect} spy={chosenSpy} />;

  return (
    <Center flexDirection="column" gap={10}>
      <Heading>Pick the spy with the fake ID</Heading>
      <Center gap={4} alignItems="flex-start" flexWrap="wrap">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            chooseCharacter={chooseCharacter}
          />
        ))}
      </Center>
    </Center>
  );
}
