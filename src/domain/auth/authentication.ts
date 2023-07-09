import { PrismaClient } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { NextApiRequest } from 'next';
import type * as Prisma from '@prisma/client';
import { findUserByEmail } from '@/domain/user/findUserByEmail';

export async function authenticateUser(
  prisma: PrismaClient,
  request: NextApiRequest
): Promise<Prisma.User | null> {
  const secret: string = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req: request, secret });

  if (token) {
    return await findUserByEmail(prisma, token.email);
  }

  return null;
}
