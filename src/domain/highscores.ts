import { PrismaClient } from '@prisma/client';
import type * as Prisma from '@prisma/client';

export async function highscores(
  prisma: PrismaClient,
): Promise<[Prisma.Highscore]> {
  return await prisma.highscore.findMany();
}
