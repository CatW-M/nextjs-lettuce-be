import { Store } from '@/utils/Store';
import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { Menu } from '@headlessui/react';
import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

export default function RootLayout({ title, children }) {
  const { status, data: session } = useSession();

  const { state, dispatch } = useContext(Store);
  const { inventory } = state;
  const [inventoryItemsCount, setInventoryItemsCount] = useState(0);
  useEffect(() => {
    setInventoryItemsCount(
      inventory.inventoryItems.reduce((a, c) => a + c.quantity, 0)
    );
  }, [inventory.inventoryItems]);

  const logoutClickHandler = () => {
    Cookies.remove('inventory');
    dispatch({ type: 'INVENTORY_RESET' });
    signOut({ callbackUrl: '/login' });
  };
  return (
    <>
      <Head>
        <title>{title ? title + ' | LettuceBe' : 'LettuceBe'}</title>
        <meta name="description" content="Food Saving App" />
      </Head>
      <ToastContainer position="bottom-center" limit={1} />
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <Link href="/" className="font-bold text-lg">
              LettuceBe
            </Link>
            <div>
              {status === 'loading' ? (
                'Loading'
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block bg-white">
                  <Menu.Button className="text-blue-600">
                    Welcome, {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white shadow-lg">
                    <Menu.Item>
                      <Link href="/profile" className="dropdown-link">
                        Profile
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <Link href="/inventory" className="dropdown-link">
                        Inventory
                        {inventoryItemsCount > 0 && (
                          <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                            {inventoryItemsCount}
                          </span>
                        )}
                      </Link>
                    </Menu.Item>
                    {session.user.isAdmin && (
                      <Menu.Item>
                        <Link className="dropdown-link" href="/admin/dashboard">
                          Admin Dashboard
                        </Link>
                      </Menu.Item>
                    )}
                    <Menu.Item>
                      <a
                        className="dropdown-link"
                        href="#"
                        onClick={logoutClickHandler}
                      >
                        Logout
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link href="/login" className="p-2">
                  {' '}
                  Log in
                </Link>
              )}
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
