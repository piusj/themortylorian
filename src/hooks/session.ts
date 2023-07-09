import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import type * as Prisma from '@prisma/client';

export function useCurrentUser(): Prisma.User | null {
  const { data: session } = useSession<{ session: Session }>();

  return session?.user || null;
}

