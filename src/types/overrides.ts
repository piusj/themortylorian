import type { Session as NextAuthSession } from 'next-auth';
import { User } from '@/lib/prisma';

export interface Session extends NextAuthSession {
  accessToken?: string;
  user: User;
}
