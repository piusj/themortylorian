import { createYoga } from 'graphql-yoga';
import createSchema from '@/app/api/graphql/createSchema';
import getContext from '@/app/api/graphql/getContext';

const { handleRequest } = createYoga({
  schema: createSchema(),

  context: getContext,

  // While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
  graphqlEndpoint: process.env.NEXT_PUBLIC_GRAPHQL_PATH,

  // Yoga needs to know how to create a valid Next response
  fetchAPI: { Response },
});

export { handleRequest as GET, handleRequest as POST };
