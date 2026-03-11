import mongoose from "mongoose";

const OrderItemOptionSchema = new mongoose.Schema(
  {
    orderID: { type: String, required: true },  
    orderItemId: { type: mongoose.Schema.Types.ObjectId, required: true },
    optionName: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("OrderItemOption", OrderItemOptionSchema, "orderItemOption");
