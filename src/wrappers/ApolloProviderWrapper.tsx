import { ApolloProvider } from '@apollo/client';
import { Session } from 'next-auth';
import React, { useMemo } from 'react';
import { makeClient } from '@/lib/graphql/client';

interface Props {
  session: Session | null;
  children: React.ReactNode;
}

export const ApolloProviderWrapper = ({ session, children }: Props) => {
  const token = session?.accessToken;

  const client = useMemo(() => makeClient(token), [token]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
