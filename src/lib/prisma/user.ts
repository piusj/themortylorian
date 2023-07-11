import { Prisma, PrismaClient } from '@/lib/prisma/index';

export function getUserById(prisma: PrismaClient, id: string, options?: any) {
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

export function updateUser(prisma: PrismaClient, user: Prisma.User) {
  return prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      ...user,
    },
  });
}

export function getMe(prisma: PrismaClient, loggedInUser: Prisma.User | null) {
  if (!loggedInUser) return null;

  return getUserById(prisma, loggedInUser.id, {
    include: { highscores: true },
  });
}
