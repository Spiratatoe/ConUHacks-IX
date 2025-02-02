import * as mongoDB from "mongodb";
import User from "../models/User";

export const collections: {
  users: mongoDB.Collection<User>
} = {
  users: {} as mongoDB.Collection<User>
}

export const connect = async () => {
  if (process.env.DB_CONN_STRING == undefined || process.env.DB_NAME === undefined) {
    throw new Error("DB_CONN_STRING and or DB_NAME is not defined in the .env file");
  }

  const client = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
  await client.connect();

  const db = client.db(process.env.DB_NAME);

  // Check if the users collection exists, if not create it
  const collectionsList = await db.listCollections({ name: "users" }).toArray();
  if (collectionsList.length === 0) {
    await db.createCollection("users");
    console.log("Created 'users' collection");
  }

  collections.users = db.collection("users");

  console.log(`Successfully connected to database: ${db.databaseName}`);
}