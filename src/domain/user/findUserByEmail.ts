import { PrismaClient } from '@prisma/client';
import type * as Prisma from '@prisma/client';

export async function findUserByEmail(prisma, email: string | null | undefined): Promise<Prisma.User | null> {
  if (!email) return null;

  return await prisma.user.findUnique({ where: { email } });
}
