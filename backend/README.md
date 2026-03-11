# SuperFry POS – Backend API Documentation

This backend provides all API endpoints required for the SuperFry POS system.  
Frontend developers can use this document to understand how to connect, fetch data, and send requests.

---

##  Base URL

### Local development
http://localhost:3000

Start the backend with:
node src/server.js

---

##  Backend Structure

backend/
  src/
    server.js
    mongo.js
    routes/
      menu.js
      orders.js
    services/
      menuService.js
      ordersService.js
    models/
      menuCategory.js
      menuItem.js
      order.js
      orderItem.js
      orderItemOption.js
  package.json
  .env
  README.md

---

##  Required Setup

Send me a message when you pull this repo so I can send you the `.env` file.  
You do not need your own MongoDB account — the shared connection string works for everyone.

---

##  How to Set Up the Backend

### 1. Install Node.js
Node 18+ required.  
Check version:
node -v

### 2. Navigate to the backend folder
cd backend

### 3. Install dependencies
npm install

### 4. Add the `.env` file
Place the `.env` file inside the `backend/` folder.

### 5. Start the backend
node src/server.js

Expected output:
Server running on port 3000  
Connected to MongoDB

---

#  API Documentation (Frontend‑Friendly)

Below are all endpoints the frontend will use.

---

#  1. GET /menu — Load Menu

Returns the full menu grouped by category.

### Endpoint
GET /menu

### Example Response
```json
[
  {
    "category": {
      "id": "cat001",
      "name": "Burgers",
      "description": "All burger items",
      "sortOrder": 1
    },
    "items": [
      {
        "id": "burger001",
        "name": "Classic Burger",
        "description": "Beef patty, lettuce, tomato, cheese",
        "price": 8.49,
        "imageURL": "https://example.com/burger.jpg",
        "isAvailable": true,
        "sortOrder": 1
      }
    ]
  }
]
```

### Frontend Usage
- Render categories  
- Render items inside each category  
- Use `id` for cart operations  

---

#  2. POST /orders — Create Order

### Endpoint
POST /orders

### Request Body
```json
{
  "table": "T1",
  "paymentMethod": "card",
  "total": 16.98,
  "items": [
    {
      "menuItemId": "burger001",
      "quantity": 2,
      "options": ["noOnions", "extraCheese"]
    }
  ]
}
```
### Example Response
```json
{
  "message": "Order created",
  "orderID": "ORD-20260311022642-WK0BY",
  "order": {
    "orderID": "ORD-20260311022642-WK0BY",
    "table": "T1",
    "items": [
      {
        "menuItemId": "burger001",
        "quantity": 2,
        "options": ["noOnions", "extraCheese"]
      }
    ],
    "total": 16.98,
    "paymentMethod": "card",
    "status": "pending",
    "_id": "69b0d2e2e39112879392d22b",
    "createdAt": "2026-03-11T02:26:42.922Z",
    "updatedAt": "2026-03-11T02:26:42.922Z",
    "__v": 0
  },
  "orderItems": [
    {
      "menuItemId": "burger001",
      "quantity": 2,
      "options": ["noOnions", "extraCheese"]
    }
  ]
}
```
### Frontend Usage
- Call this when user checks out  
- Use `orderID` to show confirmation  
- Use returned `orderItems` to display order summary  

---

#  3. GET /orders/history — Order History (Admin Dashboard)

Returns all orders with items and options rebuilt.

### Endpoint
GET /orders/history

### Example Response
```json
[
  {
    "orderID": "ORD-20260311022642-WK0BY",
    "table": "T1",
    "total": 16.98,
    "paymentMethod": "card",
    "status": "pending",
    "createdAt": "2026-03-11T02:26:42.922Z",
    "items": [
      {
        "menuItemId": "burger001",
        "quantity": 2,
        "options": ["noOnions", "extraCheese"]
      }
    ]
  }
]
```
### Frontend Usage
- Admin dashboard  
- Order history page  
- Kitchen display (poll every 5–10 seconds)  

---

#  4. PATCH /orders/:orderID/status — Update Order Status

Updates an order’s status using its `orderID`.

### Endpoint
PATCH 
```json
/orders/:orderID/status
```
Example:
PATCH 
```json
/orders/ORD-20260311022642-WK0BY/status
```
### Request Body
```json
{
  "status": "preparing"
}
```
### Example Response
```json
{
  "message": "Order status updated",
  "orderID": "ORD-20260311022642-WK0BY",
  "newStatus": "preparing"
}
```
### Frontend Usage
- Kitchen marks order as preparing  
- Admin marks order as ready or completed  
- Use this to update UI in real time  

---

#  5. Data Model Overview (Frontend‑Friendly)

### Menu Category
```json
{
  "id": "cat001",
  "name": "Burgers",
  "description": "All burger items",
  "sortOrder": 1
}
```
### Menu Item
```json
{
  "id": "burger001",
  "name": "Classic Burger",
  "description": "Beef patty, lettuce, tomato, cheese",
  "price": 8.49,
  "imageURL": "https://example.com/burger.jpg",
  "isAvailable": true,
  "sortOrder": 1
}
```
### Order Item
```json
{
  "menuItemId": "burger001",
  "quantity": 2,
  "options": ["noOnions", "extraCheese"]
}
```
---

#  6. Quick Integration Summary

| Feature              | Endpoint                          | Method | Notes                          |
|----------------------|------------------------------------|--------|---------------------------------|
| Load menu            | /menu                             | GET    | Use on menu screen              |
| Create order         | /orders                           | POST   | Checkout                        |
| View order history   | /orders/history                   | GET    | Admin dashboard / kitchen view  |
| Update order status  | /orders/:orderID/status           | PATCH  | Kitchen/admin status updates    |

---

#  Recommended Status Values

- pending  
- preparing  
- ready  
- completed  

---
