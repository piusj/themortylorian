import { PrismaClient } from '@prisma/client';
import type * as Prisma from '@prisma/client';

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
