import { useSession } from 'next-auth/react';
import { Prisma } from '@/lib/prisma';

export function useCurrentUser() {
  const { data: session, update } = useSession();

  const user = session?.user;

  async function updateUser(userValues: Partial<Prisma.User>) {
    if (!user) return null;

    await update({
      ...session,
      user: {
        ...user,
        ...userValues,
      },
    });
  }

  return { user, updateUser };
}
