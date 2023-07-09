'use client';

import React from 'react';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { ApolloProviderWrapper } from '@/lib/ApolloProviderWrapper';

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
