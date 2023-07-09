import { Avatar, Box, Button, Flex, useColorModeValue } from '@chakra-ui/react';
import { signIn, signOut } from 'next-auth/react';
import { useCurrentUser } from '@/hooks/session';
import type * as Prisma from '@prisma/client';

export default function Header() {
  const user = useCurrentUser();

  if (user)
    return (
      <Container>
        <Profile user={user} />
        <Button colorScheme="blue" onClick={() => signOut()}>
          Sign out
        </Button>
      </Container>
    );

  return (
    <Container>
      <Box>Not signed in</Box>
      <Button colorScheme="blue" onClick={() => signIn('google')}>
        Sign in
      </Button>
    </Container>
  );
}

const Container = ({ children }) => (
  <Flex
    p={4}
    justifyContent="space-between"
    alignItems="center"
    bg={useColorModeValue('gray.100', 'gray.900')}
    boxShadow="base"
  >
    {children}
  </Flex>
);

const Profile = ({ user }: { user: Prisma.User }) => (
  <Flex alignItems="center" gap={2}>
    <Avatar name={user.name} src={user.image} />
  </Flex>
);
