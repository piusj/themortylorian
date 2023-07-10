import { PrismaClient, User } from '@/lib/prisma/index';

export async function getUserById(prisma, id: string, options): Promise<User> {
  return await prisma.user.findUnique({
    where: { id },
    ...options,
  });
}

export async function getUserByEmail(
  prisma,
  email: string | null | undefined
): Promise<User | null> {
  if (!email) return null;

  return await prisma.user.findUnique({ where: { email } });
}

export async function getUsers(prisma: PrismaClient): Promise<User> {
  return await prisma.user.findMany();
}

export async function updateUser(prisma: PrismaClient, user: User): Promise<User> {
  return await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      ...user,
    },
  });
}

export async function getMe(prisma: PrismaClient, loggedInUser: User | null): Promise<User | null> {
  if (!loggedInUser) return null;

  return await getUserById(prisma, loggedInUser.id, {
    include: { highscores: true },
  });
}
