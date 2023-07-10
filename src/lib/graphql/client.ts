import { ApolloClient, createHttpLink, from, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { JWT } from 'next-auth/jwt';

const GRAPHQL_URL =
  `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_GRAPHQL_PATH}` as string;

const httpLink = createHttpLink({
  uri: GRAPHQL_URL,
  credentials: 'include',
});

export function makeClient(token: JWT) {
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
}
