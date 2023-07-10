import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { User } from '@/lib/prisma';

export function useCurrentUser(): User | null {
  const { data: session } = useSession<{ session: Session }>();

  return session?.user || null;
}
