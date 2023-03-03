import { getSession } from 'next-auth/react';
import bcryptjs from 'bcryptjs';
import User from '../../../models/User';
import db from '../../../utils/db';
import util from 'util';

async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(400).send({ message: `${req.method} not supported` });
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: 'signin required' });
  }

  const { user } = session;
  const { name, email, password } = req.body;

  if (
    !name ||
    !email ||
    !email.includes('@') ||
    (password && password.trim().length < 5)
  ) {
    res.status(422).json({
      message: 'Validation error',
    });
    return;
  }

  await db.connect();
  console.log(`-----------`);
  console.log(user);
  console.log(`-----------`);
  console.log(typeof user._id, `|${user._id}|`);
  const updateUser = await User.findOne({ email: user.email });
  console.log(`-----------`);
  console.log(updateUser);
  console.log(`-----------`);
  updateUser.name = name;
  updateUser.email = email;

  if (password) {
    updateUser.password = bcryptjs.hashSync(password);
  }

  console.log(util.inspect(updateUser, false, null, true));
  await updateUser.save(updateUser);
  console.log(`Saved`);
  const verifyUser = await User.findOne({ email: user.email });
  console.log(`-------`);
  console.log(verifyUser);
  console.log(`--------`);
  await db.disconnect();
  res.send({
    message: 'User updated',
  });
}

export default handler;
