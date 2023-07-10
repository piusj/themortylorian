import { throwNotAuthenticatedError } from '@/lib/exceptions/graphqlErrors';
import { prisma, PrismaClient, User } from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';
import { getUserByEmail } from '@/lib/prisma/user';

export type GraphQLContext = {
  prisma: PrismaClient;
  user: User | null;
};

const SECRET: string = process.env.NEXTAUTH_SECRET;
const GRAPHQL_INTROSPECTION_SECRET: string = process.env.GRAPHQL_INTROSPECTION_SECRET;

export const createContext = async ({ request }) => {
  const token = await getToken({ req: request, SECRET });
  const user = token && (await getUserByEmail(prisma, token.email));

  if (user) {
    return {
      prisma,
      user,
    };
  }

  if (request.headers.get('Authorization') === GRAPHQL_INTROSPECTION_SECRET)
    return {
      prisma,
    };

  throwNotAuthenticatedError();
};
