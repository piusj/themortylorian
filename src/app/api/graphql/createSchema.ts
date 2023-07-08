import { gql } from 'apollo-server-micro';
import { buildHTTPExecutor } from '@graphql-tools/executor-http';
import { schemaFromExecutor } from '@graphql-tools/wrap';
import { stitchSchemas } from '@graphql-tools/stitch';
import { makeExecutableSchema } from '@graphql-tools/schema';

const THIRD_PARTY_API_URL = 'https://rickandmortyapi.com/graphql';

export const localResolvers = {
  Query: {
    localData: () => {
      return 'This is local data!';
    },
  },
};

export const localTypeDefs = gql`
    type Query {
      localData: String!
    }
  `;

export default async function createSchema() {

  const localSubSchema = makeExecutableSchema({
    typeDefs: localTypeDefs,
    resolvers: localResolvers,
  });

  const remoteExecutor = buildHTTPExecutor({
    endpoint: THIRD_PARTY_API_URL,
  });

  const remoteSubSchema = {
    schema: await schemaFromExecutor(remoteExecutor),
    executor: remoteExecutor,
  };

  // Merge the local schema with the remote executable schema
  return stitchSchemas({
    subschemas: [localSubSchema, remoteSubSchema],
  });
}
