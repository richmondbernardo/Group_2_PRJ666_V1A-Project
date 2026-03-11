import mongoose from "mongoose";
console.log(">>> menuCategory model LOADED");

const MenuCategorySchema = new mongoose.Schema(
  {
    categoryID: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    sortOrder: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("menuCategory", MenuCategorySchema, "menuCategory");
