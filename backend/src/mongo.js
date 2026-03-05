import { MongoClient } from "mongodb";

let client;
let db;

export async function connectToMongo() {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    db = client.db("superfrypos");
    console.log("Connected to MongoDB");
  }
  return db;
}
