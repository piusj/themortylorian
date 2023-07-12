import { User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { Maybe } from '@/types/graphql';

export function useCurrentUser(): {
  user: Maybe<User>;
  updateUser: (userValues: Partial<User>) => void;
} {
  const { data: session, update } = useSession();

  const user = session?.user as Maybe<User>;

  async function updateUser(userValues: Partial<User>) {
    if (!user) return;

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
