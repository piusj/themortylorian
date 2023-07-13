import { Prisma, PrismaClient, User } from '@prisma/client';
import UserUpdateInput = Prisma.UserUpdateInput;
import { UserWithHighscores } from '@/types/prisma';

export function getUserById(prisma: PrismaClient, id: string, options?: any): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id },
    ...options,
  });
}

export function getUserByEmail(prisma: PrismaClient, email: string) {
  if (!email) return null;

  return prisma.user.findUnique({ where: { email } });
}

export function getUsers(prisma: PrismaClient) {
  return prisma.user.findMany();
}

export function updateUser(prisma: PrismaClient, id: string, user: UserUpdateInput) {
  return prisma.user.update({
    where: { id },
    data: { ...user },
  });
}

export function getMe(prisma: PrismaClient, loggedInUser: User | null) {
  if (!loggedInUser) return null;

  return getUserById(prisma, loggedInUser.id);
}

export function getUserByIdWithHighscores(
  prisma: PrismaClient,
  id: string
): Promise<UserWithHighscores | null> {
  return prisma.user.findUnique({
    where: { id },
    include: { highscores: true },
  });
}
