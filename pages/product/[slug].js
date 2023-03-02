import data from '@/utils/data';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import RootLayout from '../layout';

export default function ProductScreen() {
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((x) => x.slug === slug);
  if (!product) {
    return <div>Product Not Found</div>;
  }
  return (
    <RootLayout title={product.name}>
      <div className="py-2">
        <Link href="/">back to products</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        {/* <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
          ></Image>
        </div> */}
        <div>
          <ul>
            <li>
              <h1 className="text-lg" style={{ textTransform: 'capitalize' }}>
                {product.name}
              </h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Suggested Storage: {product.storage}</li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <button className="primary-button w-full">Add to inventory</button>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}
