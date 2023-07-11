import { Maybe } from 'graphql-yoga';
import { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { Prisma } from '@/lib/prisma';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
    accessToken: JWT<string>;
    user: Maybe<Prisma.User>;
  }
}
