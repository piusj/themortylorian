import { PrismaClient } from '@prisma/client';
import type * as Prisma from '@prisma/client';

export async function getHighscores(
  prisma: PrismaClient,
): Promise<[Prisma.Highscore]> {
  return await prisma.highscore.findMany();
}
