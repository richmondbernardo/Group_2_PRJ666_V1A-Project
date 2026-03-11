import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema(
  {
    orderID: { type: String, required: true },   
    menuItemId: { type: String, required: true },
    quantity: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("OrderItem", OrderItemSchema, "orderItem");
