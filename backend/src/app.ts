import express from "express";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import document from "./routes/document.route.js";

const app = express();

app.use(express.json());

app.use("/api/v1", document);

app.use(errorMiddleware);
export default app;
