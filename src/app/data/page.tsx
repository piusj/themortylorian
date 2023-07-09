'use client';

import { useQuery } from '@apollo/client';
import { Character } from 'rickmortyapi';
import { Box } from '@chakra-ui/react';
import Characters from '../../lib/graphql/queries/GetCharacters.graphql';
import GraphQLError from '@/components/GraphQLError';

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
