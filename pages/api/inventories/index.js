import Inventory from '@/models/Inventory';
import db from '@/utils/db';
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('signin required');
  }

  const { user } = session;
  await db.connect();
  const newInventory = new Inventory({
    ...req.body,
    user: user._id,
  });

  const inventory = await newInventory.save();
  res.status(201).send(inventory);
};

export default handler;
