import ProductItem from '@/components/ProductItem';
import Product from '@/models/Product';
import db from '@/utils/db';
import { Store } from '@/utils/Store';
import axios from 'axios';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import RootLayout from '../layout';

export default function Home({ products }) {
  const { state, dispatch } = useContext(Store);
  const { inventory } = state;

  // eslint-disable-next-line no-unused-vars
  const addToInventoryHandler = async (product) => {
    const existItem = inventory.inventoryItems.find(
      (x) => x.slug === product.slug
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.name === 'joke') {
      toast.error('Sorry. joke is not a food item');
      return;
    }
    dispatch({
      type: 'INVENTORY_ADD_ITEM',
      payload: { ...product, quantity },
    });
    toast.success(`${product.name} added to inventory`);
  };
  return (
    <RootLayout title="Product Page">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductItem
            product={product}
            key={product.slug}
            addToInventoryHandler={addToInventoryHandler}
          ></ProductItem>
        ))}
      </div>
    </RootLayout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
