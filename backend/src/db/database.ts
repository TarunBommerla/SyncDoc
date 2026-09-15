import dns from "dns";
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

export const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error("MONGODB_URI is not defined");
    }
    await mongoose.connect(`${mongoUri}/${DB_NAME}`);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB Connection failed: ", error);
    process.exit(1);
  }
};
