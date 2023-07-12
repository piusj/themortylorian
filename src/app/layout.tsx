import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import React from 'react';
import Page from '@/components/Page';
import authOptions from '@/lib/authOptions';
import { Providers } from '@/wrappers/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'The Mortylorian',
  description: 'A game: Morty bails, so Rick hires a bounty hunter in his place',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers session={session}>
          <Page>{children}</Page>
        </Providers>
      </body>
    </html>
  );
}
