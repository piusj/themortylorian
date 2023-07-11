'use client';

import { Box, Button, Center, useColorModeValue } from '@chakra-ui/react';
import HelloUser from '@/components/HelloUser';
import Page from '@/components/Page';
import WelcomeModal from '@/components/WelcomeModal';
import { useLinkCallback } from '@/hooks/routes';

export default function Home() {
  const goToGame = useLinkCallback('/game');

  return (
    <Page bg={useColorModeValue('blue.100', 'blue.900')}>
      <Center flexDirection="column">
        <Box my={4}>
          <HelloUser />
        </Box>
        <Box my={4}>
          <Button onClick={goToGame}>Start</Button>
        </Box>
      </Center>
      <WelcomeModal />
    </Page>
  );
}
