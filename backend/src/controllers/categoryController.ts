import Category from "../models/Category.ts";
import type { Request, Response } from "express";

export const listCategories = async (req: Request, res: Response) => {
  try {
    const cats = await Category.find().sort({ name: 1 });
    res.json({ categories: cats });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};