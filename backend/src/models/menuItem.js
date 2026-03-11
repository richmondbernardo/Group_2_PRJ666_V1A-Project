import mongoose from "mongoose";
console.log(">>> menuItem model LOADED");

const MenuItemSchema = new mongoose.Schema(
  {
    itemID: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    imageURL: { type: String },
    isAvailable: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
    attribute: { type: Object },

    
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "menuCategory"
    }
  },
  { timestamps: true }
);

export default mongoose.model("menuItem", MenuItemSchema, "menuItems");
