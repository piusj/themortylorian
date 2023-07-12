'use client';

import {
  Avatar,
  Box,
  Center,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import DataError from '../../components/Errors/DataError';
import GraphQLError from '../../components/Errors/GraphQLError';
import { Highscore, useGetHighscoresQuery } from '@/types/graphql';

export default function Highscores() {
  const { loading, error, data } = useGetHighscoresQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <GraphQLError error={error} />;
  if (!data?.highscores) return <DataError />;

  const highscores = data.highscores as Highscore[];

  return (
    <Center>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>The best bounty streaks so far</TableCaption>
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th>Space name</Th>
              <Th isNumeric>Bounty Streak</Th>
            </Tr>
          </Thead>
          <Tbody>
            {highscores.map(({ id, score, user }) => (
              <Tr key={id}>
                <Td>
                  <Flex gap={3} alignItems="center">
                    <Avatar size="xs" name={user.name || undefined} src={user.image || undefined} />
                    <Box>{user.username}</Box>
                  </Flex>
                </Td>
                <Td>{user.title}</Td>
                <Td isNumeric>{score}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Center>
  );
}
