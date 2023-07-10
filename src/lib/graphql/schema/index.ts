import { buildHTTPExecutor } from '@graphql-tools/executor-http';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { stitchSchemas } from '@graphql-tools/stitch';
import { schemaFromExecutor } from '@graphql-tools/wrap';
import resolvers from '@/lib/graphql/schema/resolvers';
import typesDefs from '@/lib/graphql/schema/typesDefs';

const THIRD_PARTY_API_URL = 'https://rickandmortyapi.com/graphql';

export async function createSchema() {
  const localSubSchema = makeExecutableSchema({
    typeDefs: typesDefs,
    resolvers: resolvers,
  });

  const remoteExecutor = buildHTTPExecutor({
    endpoint: THIRD_PARTY_API_URL,
  });

  const remoteSubSchema = {
    schema: await schemaFromExecutor(remoteExecutor),
    executor: remoteExecutor,
  };

  // Merge the local index with the remote executable index
  return stitchSchemas({
    subschemas: [localSubSchema, remoteSubSchema],
  });
}
