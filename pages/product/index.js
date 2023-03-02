import ProductItem from '@/components/ProductItem';
import data from '@/utils/data';
import RootLayout from '../layout';

export default function Home() {
  return (
    <RootLayout title="Product Page">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data.products.map((product) => (
          <ProductItem product={product} key={product.slug}></ProductItem>
        ))}
      </div>
    </RootLayout>
  );
}