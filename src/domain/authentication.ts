import { User, PrismaClient } from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';
import { NextApiRequest } from 'next';
import { getUserByEmail } from '@/domain/getUserByEmail';

export async function authenticateUser(
  prisma: PrismaClient,
  request: NextApiRequest
): Promise<User | null> {
  const secret: string = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req: request, secret });

  if (token) {
    return await getUserByEmail(prisma, token.email);
  }

  return null;
}

export async function getMe(prisma: PrismaClient, loggedInUser: User | null): Promise<User | null> {
  if (!loggedInUser) return null;

  return await prisma.user.findUnique({
    where: { id: loggedInUser.id },
    include: { highscores: true },
  });
}
