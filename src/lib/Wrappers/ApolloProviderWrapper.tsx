import React, { useMemo } from 'react';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Session } from '@/types/overrides';
import { makeClient } from '@/lib/graphql/client';

const GRAPHQL_URL = `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_GRAPHQL_PATH}`;

const httpLink = createHttpLink({
  uri: GRAPHQL_URL,
  credentials: 'include',
});

interface Props {
  session: Session | null;
  children: typeof React.Children;
}

export const ApolloProviderWrapper = ({ session, children }: Props) => {
  const token = session?.accessToken;

  const client = useMemo(() => {
    return makeClient(token);
  }, [token]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
