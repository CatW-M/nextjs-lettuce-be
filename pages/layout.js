import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

export default function RootLayout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title ? title + '- LettuceBe' : 'LettuceBe'}</title>
        <meta name="description" content="Food Saving App" />
      </Head>

      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <Link href="/" className="font-bold text-lg">
              LettuceBe
            </Link>
            <div>
              <Link href="/inventory" className="p-2">
                Inventory
              </Link>
              <Link href="/login" className="p-2">
                Log in
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          Copyright @2023 LettuceBe
        </footer>
      </div>
    </>
  );
}
