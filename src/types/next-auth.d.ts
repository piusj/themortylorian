import { User } from '@prisma/client';
import { Maybe } from 'graphql-yoga';
import { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
    accessToken: JWT<string>;
    user: Maybe<User>;
  }
}
