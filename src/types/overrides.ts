
import type { Session as NextAuthSession } from 'next-auth';

export interface Session extends NextAuthSession {
  accessToken?: string;
}
