import Order from '@/models/Order';
import db from '@/utils/db';
import { getToken } from 'next-auth/jwt';

const handler = async (req, res) => {
  const user = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!user || (user && !user.isAdmin)) {
    return res.status(401).send('Signin required!');
  }

  await db.connect();
  const order = await Order.findById(req.query.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const deliveredOrder = await order.save();
    await db.disconnect();
    res.send({
      message: 'Order delivered successfully!',
      order: deliveredOrder,
    });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Error: Order not found!' });
  }
};

export default handler;
