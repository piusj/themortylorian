'use client';

import { Box } from '@chakra-ui/react';
import Characters from '../../lib/graphql/queries/GetData.graphql';
import QueryWrapper from '@/lib/Wrappers/QueryWrapper';
import { GetDataQuery } from '@/types/graphql';
import { getServerSession } from 'next-auth';
import { makeClient } from '@/lib/graphql/client';

interface Props {
  data: GetDataQuery;
}

function Data({ data }: Props) {
  const {
    characters: { info, results },
  }: GetDataQuery = data;

  console.log({ data });

  // Process and display the private data
  return (
    <Box>
      {results.map(({ name, id }) => (
        <pre key={id}>{name}</pre>
      ))}
    </Box>
  );
}

export default QueryWrapper(Characters)(Data);
