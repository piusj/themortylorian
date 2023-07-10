import { throwNotAuthenticatedError } from '@/lib/exceptions/graphqlErrors';
import { authenticateUser } from '@/domain/authentication';
import prisma, { PrismaClient, User } from '@/lib/prisma';

export type GraphQLContext = {
  prisma: PrismaClient;
  user: User | null;
};

export const createContext = async ({ request }) => {
  const user = await authenticateUser(prisma, request);

  if (user)
    return {
      prisma,
      user,
    };

  if (request.headers.get('Authorization') === process.env.GRAPHQL_INTROSPECTION_SECRET)
    return {
      prisma,
    };

  throwNotAuthenticatedError();
};
