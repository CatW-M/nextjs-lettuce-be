import Product from '@/models/Product';
import db from '@/utils/db';
import { Store } from '@/utils/Store';
import { HeartIcon } from '@heroicons/react/outline/';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import RootLayout from '../layout';
import Image from 'next/image';

export default function ProductScreen(props) {
  const { product } = props;
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  if (!product) {
    return (
      <RootLayout title="Product Not Found ">Product Not Found</RootLayout>
    );
  }

  const addToInventoryHandler = async () => {
    const existItem = state.inventory.inventoryItems.find(
      (x) => x.slug === product.slug
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;

    dispatch({
      type: 'INVENTORY_ADD_ITEM',
      payload: { ...product, quantity },
    });
    router.push('/inventory');
  };
  return (
    <RootLayout title={product.name}>
      <div className="py-2">
        <Link href="/product">back to products</Link>
      </div>
      <div className="grid md:grid-cols-2 justify-between md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={100}
            height={100}
          ></Image>
        </div>
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
        <div className="float-right">
          <button className="primary-button" onClick={addToInventoryHandler}>
            Add to List
          </button>
        </div>
        <div className="float-right">
          <button className="secondary-button" onClick={addToInventoryHandler}>
            Save to Frequent <HeartIcon className="w-5 h-5 inline-block" />
          </button>
        </div>
      </div>
    </RootLayout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}

ProductScreen.auth = true;
