import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '@/lib/prisma';
import { getUserByEmail } from '@/lib/prisma/user';

// For advanced auth handling see:
// https://next-auth.js.org/configuration/initialization#route-handlers-app

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;

const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
    // Add other providers if needed
  ],
  secret: process.env.NEXTAUTH_SECRET,

  // Optional configuration options
  callbacks: {
    // Use the signIn() callback to control if a user is allowed to sign in.
    // params { user, account, profile, email, credentials }
    async signIn() {
      return true;
    },

    // The redirect callback is called anytime the user is redirected to a callback URL (e.g. on signin or signout).
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },

    // The session callback is called whenever a session is checked. By default, only a subset of the token is returned
    // for increased security. If you want to make something available you added to the token (like access_token and
    // user.id from above) via the jwt() callback, you have to explicitly forward it here to make it available to the
    // client.
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken;

      if (session.user?.email) {
        session.user = await getUserByEmail(prisma, session.user.email);
      }

      return session;
    },

    // This callback is called whenever a JSON Web Token is created (i.e. at sign in) or updated (i.e. whenever a
    // session is accessed in the client). The returned value will be encrypted, and it is stored in a cookie.
    async jwt({ token, account }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
};

export default authOptions;
