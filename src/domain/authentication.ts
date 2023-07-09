import * as Prisma from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { NextApiRequest } from 'next';
import { users } from '@/domain/users';

export async function authenticateUser(
  prisma: PrismaClient,
  request: NextApiRequest
): Promise<Prisma.User | null> {
  const secret: string = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req: request, secret });

  if (token) {
    return await users(prisma, token.email);
  }

  return null;
}

export async function getMe(
  prisma: PrismaClient,
  loggedInUser: Prisma.User | null
): Promise<Prisma.User | null> {
  if (!loggedInUser) return null;

  return await prisma.user.findUnique({
    where: { id: loggedInUser.id },
    include: { highscores: true },
  });
}
