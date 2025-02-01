import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: {
  users?: mongoDB.Collection
} = {}

export const connect = async () => {
  if(process.env.DB_CONN_STRING == undefined || process.env.DB_NAME === undefined) {
    throw new Error("DB_CONN_STRING and or DB_NAME is not defined in the .env file");
  }

  dotenv.config();
  const client = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
  await client.connect();
  const db = client.db(process.env.DB_NAME);
  collections.users = db.collection("users");
}