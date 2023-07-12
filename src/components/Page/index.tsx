'use client';

import { Box, BoxProps } from '@chakra-ui/react';
import React from 'react';
import Header from '@/components/Header';

export default function Page({ children, ...props }: { children: React.ReactNode } & BoxProps) {
  return (
    <Box bg="blue.100" {...props} position="relative" size="full">
      <Header />
      <Box p={10} minHeight="calc(100vh - 80px)">
        {children}
      </Box>
    </Box>
  );
}
