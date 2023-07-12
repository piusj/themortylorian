import { PrismaClient } from '@prisma/client';

export function getHighScores(prisma: PrismaClient) {
  return prisma.highscore.findMany({
    orderBy: [
      {
        score: 'desc',
      },
    ],
    include: { user: true },
  });
}
