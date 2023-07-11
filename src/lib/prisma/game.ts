import { PrismaClient } from './index';
import { getUserById } from '@/lib/prisma/user';

export function recordGameResult(prisma: PrismaClient, userId: string, isCorrect: boolean) {
  console.log('recordGameResult', userId, isCorrect);

  const user = getUserById(prisma, userId, {
    include: { highscores: true },
  });

  return user;
}
