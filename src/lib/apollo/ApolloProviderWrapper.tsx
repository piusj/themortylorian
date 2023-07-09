import React, { useMemo } from 'react';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Session } from 'next-auth';

const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_GRAPHQL_PATH}`,
  credentials: "include",
});

interface Props {
  session: Session | null;
  children: typeof React.Children;
}

export const ApolloProviderWrapper = ({ session, children }: Props) => {
  const token = session?.accessToken;

  const client = useMemo(() => {
    const authMiddleware = setContext((operation, { headers }) => ({
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : undefined,
      },
    }));

    return new ApolloClient({
      link: from([authMiddleware, httpLink]),
      cache: new InMemoryCache(),
    });
  }, [token]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
