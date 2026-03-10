import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connectDB } from "./mongo.js";

await connectDB();  

const app = express();
app.use(express.json());

// Routes
import menuItemsRouter from "./routes/menuItems.js";
app.use("/menuItems", menuItemsRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
