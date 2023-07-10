import { Prisma, PrismaClient } from '@/lib/prisma/index';

export async function getUserById(prisma: PrismaClient, id: string, options: any) {
  return await prisma.user.findUnique({
    where: { id },
    ...options,
  });
}

export async function getUserByEmail(prisma: PrismaClient, email: string) {
  if (!email) return null;

  return await prisma.user.findUnique({ where: { email } });
}

export async function getUsers(prisma: PrismaClient) {
  return await prisma.user.findMany();
}

export async function updateUser(prisma: PrismaClient, user: Prisma.User) {
  return await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      ...user,
    },
  });
}

export async function getMe(prisma: PrismaClient, loggedInUser: Prisma.User | null) {
  if (!loggedInUser) return null;

  return await getUserById(prisma, loggedInUser.id, {
    include: { highscores: true },
  });
}
