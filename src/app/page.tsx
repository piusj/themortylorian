'use client';

import { Box, Button, Center } from '@chakra-ui/react';
import GameIntro from '@/components/GameIntro';
import HelloUser from '@/components/HelloUser';
import WelcomeModal from '@/components/WelcomeModal';
import { useLinkCallback } from '@/hooks/routes';
import { useCurrentUser } from '@/hooks/session';

export default function Home() {
  const { user } = useCurrentUser();
  const goToGame = useLinkCallback('/game');

  return (
    <>
      <Center flexDirection="column">
        <Box my={4}>
          <HelloUser user={user} />
        </Box>
        <GameIntro user={user} />
        <Box my={4}>
          <Button onClick={goToGame}>Start Hunting!</Button>
        </Box>
      </Center>
      <WelcomeModal />
    </>
  );
}
