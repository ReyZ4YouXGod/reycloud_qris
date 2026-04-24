import axios from "axios";
import { connectDB } from "../../lib/mongo";
import Order from "../../models/Order";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB();

    let { amount, order_id } = req.body;

    // ✅ Validasi amount
    if (!amount || amount < 100) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    // ✅ Auto generate order_id kalau kosong
    if (!order_id) {
      order_id = "ORD-" + Date.now();
    }

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

    // ✅ Simpan ke DB
    await Order.create({
      order_id,
      amount,
      qr_string: payment.payment_number,
      status: "pending"
    });

    return res.status(200).json({
      success: true,
      order_id,
      qr_string: payment.payment_number
    });

  } catch (err) {
    console.error("ERROR CREATE:", err.response?.data || err.message);

    return res.status(500).json({
      success: false,
      message: "Failed to create transaction",
      error: err.response?.data || err.message
    });
  }
}
