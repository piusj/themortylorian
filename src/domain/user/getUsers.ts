import { PrismaClient } from '@prisma/client';
import type * as Prisma from '@prisma/client';

export async function getUsers(prisma: PrismaClient): Promise<Prisma.User> {
  return await prisma.user.findMany();
}
