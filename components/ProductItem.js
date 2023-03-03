import { PlusIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import React from 'react';

export default function ProductItem({ product, addToInventoryHandler }) {
  return (
    <div className="card  bg-red-200">
      <div className="text-center px-3">
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-lg" style={{ textTransform: 'capitalize' }}>
            {product.name}
          </h2>
        </Link>
        <button type="button">
          <PlusIcon
            className="h-5 w-5 text-blue-500 items-end"
            onClick={() => addToInventoryHandler(product)}
          />
        </button>
      </div>
    </div>
  );
}
