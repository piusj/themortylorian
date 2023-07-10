'use client';

import { Box } from '@chakra-ui/react';
import GraphQLError from '@/components/GraphQLError';
import { useGetDataQuery } from '@/types/graphql';

export default function Data() {
  const { loading, error, data } = useGetDataQuery();

  if (loading) return <p>Loading...</p>;
  // todo: Consider throwing an error and handle using ErrorBoundaries
  if (error) return <GraphQLError error={error} />;

  const results = data?.characters?.results;
  if (!results) return null;

  // Process and display the private data
  return (
    <Box>
      {results.map((character) => character && <pre key={character.id}>{character.name}</pre>)}
    </Box>
  );
}
