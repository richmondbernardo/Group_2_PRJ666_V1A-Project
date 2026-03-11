import express from "express";
import {
  validateCart,
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus
} from "../services/ordersService.js";

const router = express.Router();

// POST /orders/validate  -> "Send Order" button check
router.post("/validate", async (req, res) => {
  try {
    const { items } = req.body;
    const result = await validateCart(items);
    if (!result.valid) {
      return res.status(400).json(result);
    }
    res.json(result);
  } catch (err) {
    console.error("Validate cart error:", err);
    res.status(500).json({ error: "Failed to validate cart" });
  }
});

// POST /orders  -> create order
router.post("/", async (req, res) => {
  try {
    const result = await createOrder(req.body);

    res.status(201).json({
      message: "Order created",
      orderID: result.order.orderID,
      order: result.order,
      orderItems: result.orderItems
    });

  } catch (err) {
    console.error("Create order error:", err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
});


// GET /orders  -> list all
router.get("/", async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (err) {
    console.error("Get orders error:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// GET /orders/history ->
import { getOrderHistory } from "../services/ordersService.js";

router.get("/history", async (req, res) => {
  try {
    const history = await getOrderHistory();
    res.json(history);
  } catch (err) {
    console.error("Order history error:", err);
    res.status(500).json({ error: "Failed to load order history" });
  }
});

import { updateOrderStatusByOrderID } from "../services/ordersService.js";

router.patch("/:orderID/status", async (req, res) => {
  try {
    const { orderID } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    const updated = await updateOrderStatusByOrderID(orderID, status);

    if (!updated) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({
      message: "Order status updated",
      orderID,
      newStatus: status
    });

  } catch (err) {
    console.error("Update status error:", err);
    res.status(500).json({ error: "Failed to update order status" });
  }
});


// GET /orders/:id  -> single order by _id
router.get("/:id", async (req, res) => {
  try {
    const order = await getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    console.error("Get order error:", err);
    res.status(500).json({ error: "Failed to fetch order" });
  }
});

// PUT /orders/:id/status  -> update status only
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await updateOrderStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json({ message: "Status updated", order: updated });
  } catch (err) {
    console.error("Update status error:", err);
    res.status(500).json({ error: "Failed to update status" });
  }
});




export default router;
