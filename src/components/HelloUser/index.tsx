import { Box, Center, Heading } from '@chakra-ui/react';
import { useCurrentUser } from '@/hooks/session';

export default function HelloUser() {
  const [user] = useCurrentUser();

  if (user)
    return (
      <Container>
        <Box>
          <Heading>
            Well Hee<i>*buuurrp*</i>llooo, {user.username}!
          </Heading>
        </Box>
        {user.title && (
          <Box mt={3}>
            <Heading textAlign="center">
              So you think you&apos;re some kind of uhhh {user.title}, huh?
              <br />
              What&apos;s so special about a &quot;{user.title}&quot;, anyway?
              <br />
              Nevermind, I don&apos;t really care.
            </Heading>
          </Box>
        )}
        <Box mt={5}>
          <Heading textAlign="center">Click 'Start' if you want to</Heading>
        </Box>
      </Container>
    );

  return null;
}

const Container = ({ children }) => (
  <Center p={5} justifyContent="space-between" alignItems="center" flexDirection="column">
    {children}
  </Center>
);
