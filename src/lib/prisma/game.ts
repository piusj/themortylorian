import { Highscore, PrismaClient } from '@prisma/client';
import { getUserByIdWithHighscores, updateUser } from '@/lib/prisma/user';

export async function recordGameResult(prisma: PrismaClient, userId: string, isCorrect: boolean) {
  const user = await getUserByIdWithHighscores(prisma, userId);

  if (!user) throw new Error('user not found');

  if (isCorrect) {
    return updateUser(prisma, user.id, {
      currentStreak: user.currentStreak + 1,
    });
  }

  const newScore = user.currentStreak;
  const isNewHighscore =
    newScore > 0 && user.highscores.every(({ score }: Highscore) => newScore > score);

  const relations = isNewHighscore && {
    highscores: {
      create: [{ score: newScore }],
    },
  };
  return updateUser(prisma, user.id, {
    currentStreak: 0,
    ...relations,
  });
}
