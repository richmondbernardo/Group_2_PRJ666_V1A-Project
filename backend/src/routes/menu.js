import express from "express";
import { getFullMenu } from "../services/menuService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const menu = await getFullMenu();
    res.json(menu);
  } catch (err) {
    console.error("Menu fetch error:", err);
    res.status(500).json({ error: "Failed to load menu" });
  }
});

export default router;
