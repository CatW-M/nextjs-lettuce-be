import { PlusIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function ProductItem({ product, addToInventoryHandler }) {
  return (
    <div className="flex flex-row justify-between border shadow-md">
      <div className="overflow-x-auto md:col-span-3">
        <table className="min-w-full">
          <tbody>
            <td>
              <Link href={`/product/${product.slug}`}>
                {' '}
                <Image
                  src={product.image}
                  alt={product.name}
                  className="shadow rounded-full max-w-full h-auto align-middle border-none"
                  height={200}
                  width={200}
                />
              </Link>
            </td>
            <td className="p-5 text-right">
              {' '}
              <Link href={`/product/${product.slug}`} className="font-bold">
                {product.name}
              </Link>
            </td>
            <td className="p-5 text-center">
              <button onClick={() => addToInventoryHandler(product)}>
                <PlusIcon className="h-5 w-5"></PlusIcon>
              </button>
            </td>
          </tbody>
        </table>
      </div>
    </div>
  );
}
