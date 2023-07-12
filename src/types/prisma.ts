import { Prisma } from '@prisma/client';

export type UserWithHighscores = Prisma.UserGetPayload<{
  include: { highscores: true };
}>;
