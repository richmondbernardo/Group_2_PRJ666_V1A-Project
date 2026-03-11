import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    orderID: { type: String, required: true },
    table: { type: String },
    items: { type: Array, required: true },
    total: { type: Number, required: true },
    paymentMethod: { type: String },
    status: { type: String, default: "pending" }
  },
  { timestamps: true }
);


export default mongoose.model("Order", OrderSchema);
