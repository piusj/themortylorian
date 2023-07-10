import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { throwNotAuthenticatedError } from '@/lib/exceptions/graphqlErrors';
import { prisma, PrismaClient, Prisma } from '@/lib/prisma';
import { getUserByEmail } from '@/lib/prisma/user';

export type GraphQLContext = {
  prisma: PrismaClient;
  user: Prisma.User;
};

const SECRET: string = process.env.NEXTAUTH_SECRET as string;
const GRAPHQL_INTROSPECTION_SECRET: string = process.env.GRAPHQL_INTROSPECTION_SECRET as string;

export const createContext = async ({ request }: { request: NextRequest }) => {
  const token = await getToken({ req: request, secret: SECRET });
  const user = token?.email && (await getUserByEmail(prisma, token.email));

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
