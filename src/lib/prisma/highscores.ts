import { PrismaClient } from './index';

export function getHighScores(prisma: PrismaClient) {
  return prisma.highscore.findMany();
}
