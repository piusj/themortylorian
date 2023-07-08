'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import styles from './page.module.css';
import { Box } from '@chakra-ui/react';
import { Session } from 'next-auth';

export default function Home() {
  const { data: session } = useSession<{ session: Session }>();

  return (
    <main className={styles.main}>
      {session ? (
        <Box>
          Signed in as {session.user?.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </Box>
      ) : (
        <Box>
          Not signed in <br />
          <button onClick={() => signIn('google')}>Sign in</button>
        </Box>
      )}
      <div className={styles.description}>

        <a href="/data">Go to data</a>

      </div>
    </main>
  );
}
