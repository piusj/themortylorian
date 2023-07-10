import { Box, BoxProps } from '@chakra-ui/react';
import React from 'react';
import Header from '@/components/Header';

export default function Page({ children, ...props }: { children: React.ReactNode } & BoxProps) {
  return (
    <Box {...props}>
      <Header />
      <PageBody>{children}</PageBody>
    </Box>
  );
}

const PageBody = ({ children }: { children: React.ReactNode }) => (
  <Box p={10} h="calc(100vh - 80px)">
    {children}
  </Box>
);
