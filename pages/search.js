import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import RootLayout from './layout';
import { Store } from '../utils/Store';
import { XCircleIcon } from '@heroicons/react/outline';
import ProductItem from '../components/ProductItem';
import Product from '../models/Product';
import db from '../utils/db';

const PAGE_SIZE = 2;

export default function SearchScreen(props) {
  const router = useRouter();

  const {
    query = 'all',
    category = 'all',
    sort = 'all',
    page = 1,
  } = router.query;

  const { products, categories, pages } = props;

  const filterSearch = ({ page, category, sort, min, max, searchQuery }) => {
    const { query } = router;
    if (page) query.page = page;
    if (searchQuery) query.searchQuery = searchQuery;
    if (sort) query.sort = sort;
    if (category) query.category = category;
    if (min) query.min ? query.min : query.min === 0 ? 0 : min;
    if (max) query.max ? query.max : query.max === 0 ? 0 : max;

    router.push({
      pathname: router.pathname,
      query: query,
    });
  };
  const categoryHandler = (e) => {
    filterSearch({ category: e.target.value });
  };
  const pageHandler = (page) => {
    filterSearch({ page });
  };
  const sortHandler = (e) => {
    filterSearch({ sort: e.target.value });
  };

  const { state, dispatch } = useContext(Store);
  const addToInventoryHandler = async (product) => {
    const existItem = state.inventory.inventoryItems.find(
      (x) => x._id === product._id
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.name === 'joke') {
      toast.error('Sorry. joke is not a food item');
      return;
    }
    dispatch({ type: 'INVENTORY_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/inventory');
  };
  return (
    <RootLayout title="search">
      <div className="grid md:grid-cols-4 md:gap-5">
        <div>
          <div className="my-3">
            <h2>Categories</h2>
            <select
              className="w-full"
              value={category}
              onChange={categoryHandler}
            >
              <option value="all">All</option>
              {categories &&
                categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="mb-2 flex items-center justify-between border-b-2 pb-2">
            <div className="flex items-center">
              Results
              {query !== 'all' && query !== '' && ' : ' + query}
              {category !== 'all' && ' : ' + category}
              &nbsp;
              {(query !== 'all' && query !== '') || category !== 'all' ? (
                <button onClick={() => router.push('/search')}>
                  <XCircleIcon className="h-5 w-5" />
                </button>
              ) : null}
            </div>
            <div>
              Sort by{' '}
              <select value={sort} onChange={sortHandler}>
                <option value="favorited">Favorite</option>
                <option value="lowest">Hold Time: Longest to Short</option>
                <option value="highest">Hold Time: Shortes to Long</option>
                <option value="toprated">Saved Recently</option>
              </select>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3  ">
              {products.map((product) => (
                <ProductItem
                  key={product._id}
                  product={product}
                  addToInventoryHandler={addToInventoryHandler}
                />
              ))}
            </div>
            <ul className="flex">
              {products.length > 0 &&
                [...Array(pages).keys()].map((pageNumber) => (
                  <li key={pageNumber}>
                    <button
                      className={`default-button m-2 ${
                        page == pageNumber + 1 ? 'font-bold' : ''
                      } `}
                      onClick={() => pageHandler(pageNumber + 1)}
                    >
                      {pageNumber + 1}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}

export async function getServerSideProps({ query }) {
  const pageSize = query.pageSize || PAGE_SIZE;
  const page = query.page || 1;
  const category = query.category || '';
  const searchQuery = query.query || '';

  const queryFilter =
    searchQuery && searchQuery !== 'all'
      ? {
          name: {
            $regex: searchQuery,
            $options: 'i',
          },
        }
      : {};
  const categoryFilter = category && category !== 'all' ? { category } : {};

  await db.connect();
  const categories = await Product.find().distinct('category');
  const productDocs = await Product.find({
    ...queryFilter,
    ...categoryFilter,
  })
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .lean();

  const countProducts = await Product.countDocuments({
    ...queryFilter,
    ...categoryFilter,
  });

  await db.disconnect();
  const products = productDocs.map(db.convertDocToObj);

  return {
    props: {
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
      categories,
    },
  };
}

SearchScreen.auth = true;
