import { PrismaClient } from '@/lib/prisma/index';

export async function getHighScores(prisma: PrismaClient) {
  return await prisma.highscore.findMany();
}
