import { buildHTTPExecutor } from '@graphql-tools/executor-http';
import { schemaFromExecutor } from '@graphql-tools/wrap';
import { stitchSchemas } from '@graphql-tools/stitch';
import { makeExecutableSchema } from '@graphql-tools/schema';
import typesDefs from "@/lib/graphql/schema/typesDefs";
import resolvers from "@/lib/graphql/schema/resolvers";

const THIRD_PARTY_API_URL = 'https://rickandmortyapi.com/graphql';

async function createSchema() {
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

export const schema = await createSchema()