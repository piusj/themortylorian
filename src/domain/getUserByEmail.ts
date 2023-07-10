import { User, PrismaClient } from '@/lib/prisma';

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

export async function putUser(prisma: PrismaClient, user: User): Promise<User> {
  return await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      ...user,
    },
  });
}
