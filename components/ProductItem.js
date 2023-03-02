import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function ProductItem({ product }) {
  return (
    <div className="card">
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-lg" style={{ textTransform: 'capitalize' }}>
            {product.name}
          </h2>
        </Link>
        <p className="mb-2" style={{ textTransform: 'capitalize' }}>
          Suggested Storage:
        </p>
        <p className="mb-2" style={{ textTransform: 'capitalize' }}>
          {product.storage}
        </p>
        <button className="primary-button" type="button">
          Add to Inventory
        </button>
      </div>
    </div>
  );
}
