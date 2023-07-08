'use client';

import { useQuery, gql } from '@apollo/client';
import {Character} from "rickmortyapi";
import {Box} from "@chakra-ui/react";
import GraphQLError from "@/components/GraphQLError";

const QUERY_CHARACTERS = gql`
  query {
    characters(page: 1) {
      info {
        count
      }
      results {
        name
      }
    }
  }
`;

export default function Data() {
  const { loading, error, data } = useQuery(QUERY_CHARACTERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <GraphQLError error={error} query={QUERY_CHARACTERS} />;

  const { characters: { info, results }} = data;

  // Process and display the private data
  return <Box>{results.map(({name}: Character) => (
    <pre>{name}</pre>
  ))}</Box>;
}
