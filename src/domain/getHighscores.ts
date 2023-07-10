import { Highscore, PrismaClient } from '@/lib/prisma';

export async function getHighscores(prisma: PrismaClient): Promise<[Highscore]> {
  return await prisma.highscore.findMany();
}
