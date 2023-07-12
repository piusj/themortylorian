import { Box, Heading, Image, Card, Tbody, Tr, Th, Table, Td } from '@chakra-ui/react';
import { Character } from '@/types/graphql';

interface Props {
  character: Character;
  chooseCharacter: (id: string) => void;
}

export function CharacterCard({ character, chooseCharacter }: Props) {
  const name = character.name as string;
  const image = character.image as string;
  const id = character.id as string;

  return (
    <Card
      onClick={() => chooseCharacter(id)}
      sx={{
        flex: '1 1 0',
        backgroundColor: 'var(--chakra-colors-gray-700)',
        color: 'var(--chakra-colors-gray-200)',
        minWidth: 200,
        maxWidth: 300,
        cursor: 'pointer',
        ':hover': {
          boxShadow: 'var(--chakra-shadows-lg)',
          transform: 'translate(1px,-1px)',
        },
      }}
      pb={4}
    >
      <Box>
        <Image src={image} alt={name} />
      </Box>
      <Box p={4}>
        <Heading fontSize="2xl">{character.name}</Heading>
      </Box>
      <Table variant="unstyled" size="sm">
        <Tbody>
          <Tr>
            <Th>ID</Th>
            <Td width="100%">{character.id}</Td>
          </Tr>
          <Tr>
            <Th>Species</Th>
            <Td width="100%">{character.species || 'unknown'}</Td>
          </Tr>
          <Tr>
            <Th>Type</Th>
            <Td width="100%">{character.type || 'unknown'}</Td>
          </Tr>
          <Tr>
            <Th>Gender</Th>
            <Td width="100%">{character.gender || 'Unknown'}</Td>
          </Tr>
        </Tbody>
      </Table>
    </Card>
  );
}
