import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  sortOrder: Number
});

export default mongoose.model("Category", CategorySchema);
