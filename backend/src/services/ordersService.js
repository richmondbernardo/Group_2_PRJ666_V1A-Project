import Order from "../models/order.js";
import OrderItem from "../models/orderItem.js";
import OrderItemOption from "../models/orderItemOption.js";
import { generateOrderID } from "../utils/generateOrderID.js";

export async function validateCart(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return { valid: false, message: "Cart is empty" };
  }
  return { valid: true };
}

export async function createOrder(payload) {
  const { items, table, paymentMethod, total } = payload;

  // 1. Validate cart
  const validation = await validateCart(items);
  if (!validation.valid) {
    const error = new Error(validation.message);
    error.statusCode = 400;
    throw error;
  }

  // 2. Generate unique timestamped order ID
  const orderID = generateOrderID();

  // 3. Create the main order document
  const order = new Order({
    orderID,
    items, // still stored for convenience
    table,
    paymentMethod,
    total,
    status: "pending"
  });

  const savedOrder = await order.save();

  // 4. Insert order items + options
  for (const item of items) {
    const orderItemDoc = await OrderItem.create({
      orderID,
      menuItemId: item.menuItemId,
      quantity: item.quantity
    });

    // Insert options for this item
    if (Array.isArray(item.options)) {
      for (const opt of item.options) {
        await OrderItemOption.create({
          orderID,
          orderItemId: orderItemDoc._id,
          optionName: opt
        });
      }
    }
  }

  // 5. Fetch order items and options to build a combined response
const orderItems = await OrderItem.find({ orderID });

const orderItemsWithOptions = [];

for (const item of orderItems) {
  const options = await OrderItemOption.find({
    orderID,
    orderItemId: item._id
  });

  orderItemsWithOptions.push({
    menuItemId: item.menuItemId,
    quantity: item.quantity,
    options: options.map(o => o.optionName)
  });
}

// 6. Return combined response
return {
  order: savedOrder,
  orderItems: orderItemsWithOptions
};

  return savedOrder;
}

export async function getAllOrders() {
  return Order.find().sort({ createdAt: -1 });
}

export async function getOrderById(id) {
  return Order.findById(id);
}

export async function updateOrderStatus(id, status) {
  return Order.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
}

export async function getOrderHistory() {
  // 1. Fetch all orders (newest first)
  const orders = await Order.find().sort({ createdAt: -1 });

  const result = [];

  for (const order of orders) {
    // 2. Fetch items for this order
    const orderItems = await OrderItem.find({ orderID: order.orderID });

    const itemsWithOptions = [];

    for (const item of orderItems) {
      // 3. Fetch options for each item
      const options = await OrderItemOption.find({
        orderID: order.orderID,
        orderItemId: item._id
      });

      itemsWithOptions.push({
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        options: options.map(o => o.optionName)
      });
    }

    // 4. Build final structure
    result.push({
      orderID: order.orderID,
      table: order.table,
      total: order.total,
      paymentMethod: order.paymentMethod,
      status: order.status,
      createdAt: order.createdAt,
      items: itemsWithOptions
    });
  }

  return result;
}

export async function updateOrderStatusByOrderID(orderID, newStatus) {
  const updated = await Order.findOneAndUpdate(
    { orderID },
    { status: newStatus },
    { new: true }
  );

  return updated;
}


