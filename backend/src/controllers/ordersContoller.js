import Order from "../models/order.js";
import generateOrderID from "../utils/generateOrderID.js";

// Validate cart (already used by /orders/validate)
export const validateCart = async (items) => {
  if (!items || items.length === 0) {
    return { valid: false, message: "Cart must contain at least one item." };
  }
  return { valid: true };
};

// Create order
export const createOrder = async (orderData) => {
  const { table, items, total } = orderData;

  // 1. Validate cart
  if (!items || items.length === 0) {
    const error = new Error("Order must contain at least one item.");
    error.statusCode = 400;
    throw error;
  }

  // 2. Generate unique timestamped order ID
  const orderID = generateOrderID();

  // 3. Create order document
  const newOrder = await Order.create({
    orderID,
    table,
    items,
    total,
    status: "pending",
    createdAt: new Date()
  });

  return newOrder;
};

// Get all orders
export const getAllOrders = async () => {
  return await Order.find().sort({ createdAt: -1 });
};

// Get order by ID
export const getOrderById = async (id) => {
  return await Order.findById(id);
};

// Update order status
export const updateOrderStatus = async (id, status) => {
  return await Order.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
};
