import type { Request, Response, NextFunction } from "express";
import apiError from "../utils/apiError.js";

const errorMiddleware = (
  err: apiError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // ------------------------- CAST ERROR HANDLING

  if (err.name === "CastError") {
    const message = `This is an invalid resource: ${err.message}`;

    err = new apiError(404, message);
  }

  // ------------------------- DUPLICATE KEY ERROR

  if (err.name === "MongoServerError" && err.statusCode === 11000) {
    const message =
      "This resource is already registered. Please use a different value.";

    err = new apiError(400, message);
  }

  // ------------------------- COMMON ERROR HANDLING

  res.status(err.statusCode).json({
    success: err.success,
    message: err.message,
    errors: err.errors,
    data: err.data,

    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorMiddleware;
