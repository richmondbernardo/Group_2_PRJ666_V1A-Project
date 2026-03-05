import express from "express";
import { connectToMongo } from "../mongo.js";

const router = express.Router();

router.get("/test", async (req, res) => {
  try {
    const db = await connectToMongo();
    await db.collection("test").insertOne({ ok: true, createdAt: new Date() });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
