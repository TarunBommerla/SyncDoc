import dotenv from "dotenv";
dotenv.config({
  path: "./src/config/.env",
});

import app from "./app.js";

import { connectDB } from "./db/database.js";

const PORT = Number(process.env.PORT) || 5000;

const startServer = async (): Promise<void> => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`SyncDoc server running on port ${PORT}`);
  });
};

startServer();