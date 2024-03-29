import { getToken } from 'next-auth/jwt';
import Order from '@/models/Order';
import db from '@/utils/db';

const handler = async (req, res) => {
  const user = await getToken({ req, secret: process.env.SECRET });

  if (!user) {
    return res.status(401).send('Signin required!');
  }
  await db.connect();
  const orders = await Order.find({ user: user._id });
  await db.disconnect();
  res.send(orders);
};

export default handler;
