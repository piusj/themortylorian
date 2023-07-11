'use client';

import { Box } from '@chakra-ui/react';
import DataError from '../../components/Errors/DataError';
import GraphQLError from '../../components/Errors/GraphQLError';
import { dataQueryVariables, generateScenario } from '@/app/game/engine';
import { CharacterCard } from '@/components/CharacterCard';
import { Character, useGetDataQuery, usePutGameResultMutation } from '@/types/graphql';

export default function Game() {
  const { loading, error, data } = useGetDataQuery({ variables: dataQueryVariables });
  const [saveGameResult] = usePutGameResultMutation();

  if (loading) return <p>Loading...</p>;
  if (error) return <GraphQLError error={error} />;
  if (!data?.charactersByIds) return <DataError />;

  const characterData = data.charactersByIds as Character[];
  const [characters, spyId] = generateScenario(characterData);

  async function shootCharacter(id: string) {
    const isCorrect = id === spyId;
    const variables = { isCorrect };
    const { data } = await saveGameResult({ variables });

    console.log('saveGameResult', { data });

    window.location.reload();
  }

  return (
    <Box>
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} shootCharacter={shootCharacter} />
      ))}
    </Box>
  );
}
