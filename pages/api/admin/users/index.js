import db from '@/utils/db';
import User from '@/models/User';
import { getToken } from 'next-auth/jwt';

const handler = async (req, res) => {
  const user = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!user || (user && !user.isAdmin)) {
    return res.status(401).send('Signin required!');
  }

  await db.connect();
  const users = await User.find({});
  await db.disconnect();
  res.send(users);
};

export default handler;
