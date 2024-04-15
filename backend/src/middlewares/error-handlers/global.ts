import { NextFunction, Request, Response } from "express";
import logger from "../../libs/logger";

export default function globalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errStatus = err.statusCode || 500;
  const errMessage = err.message || "Sorry, something went wrong!";

  logger.error(`${errMessage}\n${err.stack}`);
  res.status(errStatus).json({
    message: errMessage,
  });
}
