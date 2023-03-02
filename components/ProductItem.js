import { PlusIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import React from 'react';

export default function ProductItem({ product }) {
  return (
    <div className="card">
      <div className="float-left px-3">
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-lg" style={{ textTransform: 'capitalize' }}>
            {product.name}
          </h2>
          <span type="button">
            <PlusIcon className="h-5 w-5 text-blue-500 items-end" />
          </span>
        </Link>
      </div>
    </div>
  );
}
