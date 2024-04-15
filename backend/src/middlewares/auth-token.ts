import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default async function authToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header("Authorization")?.split(" ")[1];
  const { JWT_SECRET } = process.env;

  if (!token)
    return res.status(401).json({ message: "Unauthorized!", valid: false });

  jwt.verify(token, JWT_SECRET!, (err, payload) => {
    if (err) return res.status(403).json({ message: "Expired", valid: false });

    req.user = payload;
    next();
  });
}
