// models/Order.js
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  order_id: String,
  amount: Number,
  qr_string: String,
  status: { type: String, default: "pending" },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
