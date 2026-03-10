import mongoose from "mongoose";

const MenuItemSchema = new mongoose.Schema({
  itemID: { type: String, required: true },
  name: { type: String, required: true },
  description: String,
  price: Number,
  imageURL: String,
  isAvailable: Boolean,
  sortOrder: Number,
  attribute: {
    calories: Number
  }
});


export default mongoose.model("menuItems", MenuItemSchema, "menuItems");

