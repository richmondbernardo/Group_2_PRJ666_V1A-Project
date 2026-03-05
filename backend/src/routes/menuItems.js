import express from "express";
import { connectToMongo } from "../mongo.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const db = await connectToMongo();
    const items = await db.collection("menuItems").find().toArray();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
