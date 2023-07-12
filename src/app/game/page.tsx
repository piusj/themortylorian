'use client';

import { Center } from '@chakra-ui/react';
import { useState } from 'react';
import DataError from '../../components/Errors/DataError';
import GraphQLError from '../../components/Errors/GraphQLError';
import { CharacterCard } from '@/components/CharacterCard';
import ChosenState from '@/components/ChosenState';
import { useCurrentUser } from '@/hooks/session';
import { useGenerateScenario } from '@/hooks/useGenerateScenario';
import { usePutGameResultMutation } from '@/types/graphql';

export default function Game() {
  const { updateUser } = useCurrentUser();
  const { loading, error, data } = useGenerateScenario();
  const [saveGameResult] = usePutGameResultMutation();
  const [hasChosen, setHasChosen] = useState<boolean>(false);
  const [wasCorrect, setWasCorrect] = useState<boolean>(false);

  if (loading) return <Center>Loading...</Center>;
  if (error) return <GraphQLError error={error} />;
  if (!data) return <DataError />;

  const { characters, spyId } = data;

  async function chooseCharacter(id: string) {
    const isCorrect = id === spyId;

    setHasChosen(true);
    setWasCorrect(isCorrect);

    const { data } = await saveGameResult({ variables: { isCorrect } });

    if (data?.putGameResult) {
      await updateUser({
        currentStreak: data.putGameResult.currentStreak,
      });
    }
  }

  if (hasChosen) return <ChosenState correct={wasCorrect} />;

  return (
    <Center>
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
