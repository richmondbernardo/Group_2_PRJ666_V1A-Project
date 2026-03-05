# SuperFry POS – Backend API Documentation

This backend provides all API endpoints required for the SuperFry POS system. Frontend developers can use this document to understand how to connect, fetch data, and send requests.

---

## Base URL

### Local development
http://localhost:3000

Run the backend with:
node src/server.js

---

## Backend Structure

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

## Required Setup to Run Both

Send me a message when you pull this repo so I can send you the `.env` file.  
You will not need to create your own MongoDB connection string.

---

## How to Set Up the Backend on Your Machine

Follow these steps after cloning the repo:

### 1. Install Node.js
Make sure Node.js (version 18 or higher) is installed on your computer.  
Check your version with:
node -v

### 2. Navigate to the backend folder
From the project root:
cd backend

### 3. Install dependencies
Run:
npm install

### 4. Add the `.env` file
I will send you the `.env` file privately.  
Place it inside the `backend/` folder.

You do **not** need to install MongoDB locally.  
You do **not** need your own MongoDB Atlas account.  
The shared connection string already works for all teammates.

### 5. Start the backend
Run:
node src/server.js

If everything is correct, you should see:
Server running on port 3000
Connected to MongoDB