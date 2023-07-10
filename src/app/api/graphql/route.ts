import { createYoga } from 'graphql-yoga';
import { createContext } from '@/lib/graphql/context';
import { createSchema } from '@/lib/graphql/schema';

const { handleRequest } = createYoga({
  schema: createSchema(),

  context: createContext,

  // While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
  graphqlEndpoint: process.env.NEXT_PUBLIC_GRAPHQL_PATH,

  // Yoga needs to know how to create a valid Next response
  fetchAPI: { Response },
});

export { handleRequest as GET, handleRequest as POST };

export const config = {
  api: {
    bodyParser: false,
  },
};
