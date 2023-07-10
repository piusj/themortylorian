import type { CodegenConfig } from '@graphql-codegen/cli';
import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd());

const GRAPHQL_URL =
  `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_GRAPHQL_PATH}` as string;
const GRAPHQL_INTROSPECTION_SECRET = process.env.GRAPHQL_INTROSPECTION_SECRET as string;

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      [GRAPHQL_URL]: {
        headers: {
          Authorization: GRAPHQL_INTROSPECTION_SECRET,
        },
      },
    },
  ],
  documents: 'src/**/*.graphql',
  generates: {
    'src/types/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
    },
  },
};

export default config;
