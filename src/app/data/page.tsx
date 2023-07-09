'use client';

import { useQuery, gql } from '@apollo/client';
import { Character } from 'rickmortyapi';
import { Box } from '@chakra-ui/react';
import GraphQLError from '@/components/GraphQLError';
import Characters from './queries/GetCharacters.graphql';

export default function Data() {
  const { loading, error, data } = useQuery(Characters);

  if (loading) return <p>Loading...</p>;
  if (error) return <GraphQLError error={error} />;

  const {
    characters: { info, results },
  } = data;

  console.log({ data });

  // Process and display the private data
  return (
    <Box>
      {results.map(({ name, id }: Character) => (
        <pre key={id}>{name}</pre>
      ))}
    </Box>
  );
}
