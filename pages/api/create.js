// pages/api/create.js
import axios from "axios";
import { connectDB } from "../../lib/mongo";
import Order from "../../models/Order";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  await connectDB();

  const { amount, order_id } = req.body;

  const resp = await axios.post(
    "https://app.pakasir.com/api/transactioncreate/qris",
    {
      project: process.env.PAKASIR_PROJECT,
      order_id,
      amount,
      api_key: process.env.PAKASIR_API_KEY
    }
  );

  const payment = resp.data.payment;

  await Order.create({
    order_id,
    amount,
    qr_string: payment.payment_number,
    status: "pending"
  });

  res.json({
    order_id,
    qr_string: payment.payment_number
  });
}
