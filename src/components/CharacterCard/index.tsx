import { Box, Button, Heading, Image } from '@chakra-ui/react';
import { Character } from '@/types/graphql';

interface Props {
  character: Character;
  shootCharacter: (id: string) => void;
}

export function CharacterCard({ character, shootCharacter }: Props) {
  const name = character.name as string;
  const image = character.image as string;
  const id = character.id as string;

  function handleSelectCard() {
    shootCharacter(id);
  }

  return (
    <Box border="1px" borderColor="gray.200">
      <Heading>{character.name}</Heading>
      <Box>
        <Image src={image} alt={name} />
      </Box>
      <Box>
        <Button onClick={handleSelectCard}>Shoot Spy</Button>
      </Box>
      <Box>
        <pre>{JSON.stringify(character)}</pre>
      </Box>
    </Box>
  );
}
