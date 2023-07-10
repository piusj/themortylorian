import { Highscore, PrismaClient } from '@/lib/prisma/index';

export async function getHighScores(prisma: PrismaClient): Promise<[Highscore]> {
  return await prisma.highscore.findMany();
}
