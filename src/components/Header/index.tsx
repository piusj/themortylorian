import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import { User } from '@prisma/client';
import { signIn, signOut } from 'next-auth/react';
import React from 'react';
import { useCurrentUser } from '@/hooks/session';

export default function Header() {
  const { user } = useCurrentUser();

  if (user)
    return (
      <Container>
        <Flex gap={8}>
          <Profile user={user} />
          <Center gap={4}>
            <Link href="/">Home</Link>
            <Link href="/highscores">Highscores</Link>
          </Center>
        </Flex>
        <Flex gap={4}>
          <Center>
            <Badge variant="outline" colorScheme="green">
              Current Streak: {user.currentStreak}
            </Badge>
          </Center>
          <Button flexShrink={0} colorScheme="blue" onClick={() => signOut()}>
            Sign out
          </Button>
        </Flex>
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

const Container = ({ children }: { children: React.ReactNode }) => (
  <Flex
    p={4}
    justifyContent="space-between"
    alignItems="center"
    bg={useColorModeValue('gray.100', 'gray.900')}
    boxShadow="base"
    gap={4}
  >
    {children}
  </Flex>
);

const Profile = ({ user }: { user: User }) => (
  <Flex alignItems="center" gap={2}>
    <Avatar name={user.name || undefined} src={user.image || undefined} />
  </Flex>
);
