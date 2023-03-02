import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useContext } from 'react';
import RootLayout from './layout';
import { XCircleIcon } from '@heroicons/react/outline';
import { Store } from '../utils/Store';
import Image from 'next/image';
import { getCurrentDate } from '@/utils/getCurrentDate';

function InventoryScreen() {
  const { state, dispatch } = useContext(Store);
  const {
    inventory: { inventoryItems },
  } = state;

  const removeItemHandler = (item) => {
    dispatch({ type: 'INVENTORY_REMOVE_ITEM', payload: item });
  };

  return (
    <div>
      <RootLayout title="Inventory">
        <h1 className="mb-4 text-xl">Inventory</h1>
        {/* conditional rendering to check if inventory is empty */}
        {inventoryItems.length === 0 ? (
          <div>
            Inventory is empty. <Link href="/product">Add Products</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-4 md:gap-5">
            <div className="overflow-x-auto md:col-span-3">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">Item</th>
                    <th className="p-5 text-right">Date Added</th>
                    <th className="p-5 text-right">Expiration</th>
                    <th className="px-5">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryItems.map((item) => (
                    <tr key={item.slug} className="border-b">
                      <td>
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center"
                        >
                          {' '}
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          ></Image>
                          &nbsp;
                          {item.name}
                        </Link>
                      </td>
                      <td className="p-5 text-right">{getCurrentDate()}</td>
                      <td className="p-5 text-right">
                        Expires in {item.optimalHold} days
                      </td>
                      <td className="p-5 text-center">
                        <button onClick={() => removeItemHandler(item)}>
                          <XCircleIcon className="h-5 w-5"></XCircleIcon>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <Link href="/product">Add more products</Link>
            </div>
          </div>
        )}
      </RootLayout>
    </div>
  );
}

export default dynamic(() => Promise.resolve(InventoryScreen), { ssr: false });
