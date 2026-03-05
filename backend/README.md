# SuperFry POS – Backend API Documentation

This backend provides all API endpoints required for the SuperFry POS system. Frontend developers can use this document to understand how to connect, fetch data, and send requests.

---

##  Base URL

### Local development
http://localhost:3000

Run the backend with:
node src/server.js

---

##  Backend Structure

backend/
  src/
    server.js
    mongo.js
    routes/
      menuItems.js
      orders.js
  package.json
  .env
  README.md

---

##  Environment Variables

The backend uses a `.env` file (not committed to GitHub):

MONGO_URI=<your-mongodb-connection-string>
PORT=3000

Frontend does **not** need this file.

---

##  Connecting From Frontend

Frontend can call the backend using `fetch()` or Axios.

### Example (React)
useEffect(() => {
  fetch("http://localhost:3000/menuItems")
    .then(res => res.json())
    .then(data => setMenuItems(data));
}, []);

---

##  API Endpoints

###  Menu Items

#### GET `/menuItems`
Returns all menu items.

**Example Request**
GET http://localhost:3000/menuItems

**Example Response**
[
  {
    "_id": "698ad5234a72ff9dd6031fbe",
    "itemID": "burger001",
    "name": "Classic Burger",
    "description": "Beef patty, lettuce, tomato, cheese",
    "price": 7.49,
    "imageURL": "https://example.com/burger.jpg",
    "isAvailable": true,
    "sortOrder": 1,
    "attribute": {
      "calories": 550
    }
  }
]

---

###  Orders

#### GET `/orders`
Returns all orders.

GET http://localhost:3000/orders

#### POST `/orders`
Creates a new order.

**Example Request**
{
  "orderID": "order123",
  "items": [
    {
      "itemID": "burger001",
      "quantity": 2
    }
  ],
  "status": "pending",
  "total": 14.98
}

**Example Response**
{
  "message": "Order created successfully"
}

---

##  CORS

If the frontend gets CORS errors, ensure this is in `server.js`:

import cors from "cors";
app.use(cors());

---

##  Testing Endpoints

You can test using:

- Thunder Client (VS Code)
- Postman
- Browser (GET only)
- React fetch calls

Example:
const res = await fetch("http://localhost:3000/orders");
const orders = await res.json();

---

##  Error Handling (Frontend Expectations)

Frontend should expect:

- 200 success  
- 201 created  
- 404 not found  
- 500 server error  

Example:
try {
  const res = await fetch("http://localhost:3000/menuItems");
  if (!res.ok) throw new Error("Failed to fetch menu items");
  const data = await res.json();
} catch (err) {
  console.error(err);
}

---

##  Summary for Frontend Team

- Backend runs on http://localhost:3000
- Endpoints:
  - GET /menuItems
  - GET /orders
  - POST /orders
- All responses are JSON
- CORS must be enabled
- `.env` stays backend-only
~~~
