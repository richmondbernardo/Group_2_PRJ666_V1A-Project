import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connectDB } from "./mongo.js";

await connectDB();

const app = express();
app.use(express.json());


import "./models/menuCategory.js";
import "./models/menuItem.js";

// Routes
import menuItemsRouter from "./routes/menuItems.js";
app.use("/menuItems", menuItemsRouter);

import ordersRouter from "./routes/orders.js";
app.use("/orders", ordersRouter);

import menuRouter from "./routes/menu.js";
app.use("/menu", menuRouter);


app.listen(3000, () => {
  console.log("Server running on port 3000");
});
