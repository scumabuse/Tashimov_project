import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface AuthRequest extends Request {
  user?: any;
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization") || req.header("authorization");
  const token = authHeader?.replace("Bearer ", "") || null;
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};