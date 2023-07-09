import * as Prisma from '@prisma/client';
import { PrismaClient } from '@prisma/client';

export async function users(prisma, email: string | null | undefined): Promise<Prisma.User | null> {
  if (!email) return null;

  return await prisma.user.findUnique({ where: { email } });
}

export async function getUsers(prisma: PrismaClient): Promise<Prisma.User> {
  return await prisma.user.findMany();
}
