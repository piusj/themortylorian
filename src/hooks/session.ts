import { useSession } from 'next-auth/react';
import { User } from '@/lib/prisma';
import { Session } from '@/types/overrides';

export function useCurrentUser(): User | null {
  const { data: session, update } = useSession<{ session: Session }>();

  async function updateUser(newValues) {
    await update({
      ...session,
      user: {
        ...session?.user,
        ...newValues,
      },
    });
  }

  return [session?.user, updateUser];
}
