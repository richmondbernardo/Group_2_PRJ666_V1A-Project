import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  orderID: { type: String, required: true },
  items: [
    {
      itemID: String,
      quantity: Number
    }
  ],
  status: { type: String, default: "pending" },
  total: Number,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Order", OrderSchema);
