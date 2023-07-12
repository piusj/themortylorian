import { PrismaClient } from '@prisma/client';

export function getHighScores(prisma: PrismaClient) {
  return prisma.highscore.findMany({
    orderBy: [
      {
        score: 'desc',
      },
    ],
    take: 10,
    include: { user: true },
  });
}
