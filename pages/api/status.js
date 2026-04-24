// pages/api/status.js
import axios from "axios";
import { connectDB } from "../../lib/mongo";
import Order from "../../models/Order";

export default async function handler(req, res) {
  const { order_id, amount } = req.query;

  await connectDB();

  const resp = await axios.get(
    "https://app.pakasir.com/api/transactiondetail",
    {
      params: {
        project: process.env.PAKASIR_PROJECT,
        amount,
        order_id,
        api_key: process.env.PAKASIR_API_KEY
      }
    }
  );

  const trx = resp.data.transaction;

  if (trx.status === "completed") {
    await Order.updateOne({ order_id }, { status: "paid" });
  }

  res.json({ status: trx.status });
}
