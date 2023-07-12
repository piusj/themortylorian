import { Box, Center } from '@chakra-ui/react';
import { User } from '@prisma/client';
import React from 'react';
import { Maybe } from '@/types/graphql';

export default function HelloUser({ user }: { user: Maybe<User> }) {
  if (user)
    return (
      <Container>
        {user.username && (
          <Box fontWeight={500}>
            Hello {user.username}
            {user.title && `, the ${user.title}...`}
          </Box>
        )}
      </Container>
    );

  return null;
}

const Container = ({ children }: { children: React.ReactNode }) => (
  <Center p={5} justifyContent="space-between" alignItems="center" flexDirection="column">
    {children}
  </Center>
);
