'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import theme from '../lib/theme';
import { ApolloProviderWrapper } from '@/wrappers/ApolloProviderWrapper';

export interface ProviderProps {
  children: React.ReactNode;
  session: Session | null;
}

export function Providers({ session, children }: ProviderProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProviderWrapper session={session}>
        <CacheProvider>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </CacheProvider>
      </ApolloProviderWrapper>
    </SessionProvider>
  );
}
