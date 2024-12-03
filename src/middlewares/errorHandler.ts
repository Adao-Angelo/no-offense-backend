import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

export const errorHandler = (
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    response.status(err.statusCode).json({
      message: err.message,
    });
  }

  response.status(500).json({
    status: "error",
    message: `Internal server Error - ${err.message}`,
  });
};
