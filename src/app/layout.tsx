import React from 'react';
import { Inter } from 'next/font/google';
import { Providers } from '@/lib/Wrappers/Providers';
import { getServerSession } from 'next-auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Leonardo Interview',
  description: 'Example app for Leonardo interview',
};


export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
