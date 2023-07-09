'use client';

import {Box, Button, Link, Center, useColorModeValue} from '@chakra-ui/react';
import Page from '@/components/Page';
import { useLinkCallback } from '@/hooks/routes';
import HelloUser from '@/components/HelloUser';

export default function Home() {
  const goToData = useLinkCallback('/data');

  return (
    <Page bg={useColorModeValue('blue.100', 'blue.900')}>
      <Center flexDirection="column">
        <Box my={4}>
          <HelloUser />
        </Box>
        <Box my={4}>
          <Button onClick={goToData}>Start</Button>
        </Box>
      </Center>
    </Page>
  );
}
