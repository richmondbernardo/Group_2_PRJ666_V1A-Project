import dotenv from "dotenv";
dotenv.config();

console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

import express from "express";
import { connectToMongo } from "./mongo.js";

await connectToMongo(); 

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

import menuItemsRouter from "./routes/menuItems.js";
app.use("/menuItems", menuItemsRouter);
