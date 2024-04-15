import { NextFunction, Request, Response } from "express";
import logger from "../../libs/logger";

export default function notFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error("Routes didn't exist!");
  res.status(404).json({ message: "Routes didn't exist!" });
}
