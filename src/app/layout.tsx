import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import React from 'react';
import authOptions from '@/lib/authOptions';
import { Providers } from '@/wrappers/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Leonardo Interview',
  description: 'Example app for Leonardo interview',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
