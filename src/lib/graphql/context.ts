import { User } from 'next-auth';
import { throwNotAuthenticatedError } from '@/lib/exceptions/graphqlErrors';
import { PrismaClient } from '@prisma/client';
import { authenticateUser } from '@/domain/auth/authentication';

const prisma = new PrismaClient();

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
      prisma
    };

  throwNotAuthenticatedError();
};
