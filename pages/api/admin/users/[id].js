import { getSession } from 'next-auth/react';
// import db from '@/utils/db';
import User from '@/models/User';
import { ObjectId } from 'mongodb';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || !session.user.isAdmin) {
    return res.status(401).send('admin signin required');
  }

  if (req.method === 'DELETE') {
    return deleteHandler(req, res);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};

const deleteHandler = async (req, res) => {
  let id = req.query.id;
  let userToDelete = await User.findById({ _id: new ObjectId(id) });

  if (userToDelete.isAdmin) {
    return res.status(400).send({ message: 'Can not delete admin' });
  }
  await User.findByIdAndDelete({ _id: new ObjectId(id) });
  console.log('user has been deleted');
  return res.status(201).send({ message: 'I ' });
};

// const db = client.db();
// const user = await db
//   .collection('users')
//   .deleteOne({ _id: id, isAdmin: false });
// console.log('--------------------------');
// console.log(user);
// console.log('--------------------------');

// client.close();

// res.status(201).send({ message: 'Deleted user' });
// };

export default handler;
