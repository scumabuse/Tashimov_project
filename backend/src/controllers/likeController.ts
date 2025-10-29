import Like from "../models/Like.js";
import Model3D from "../models/Model3D.js";
import { Request, Response } from "express";

export const toggleLike = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const modelId = req.params.id;

    const existing = await Like.findOne({ user: userId, model: modelId });
    if (existing) {
      // unlike
      await existing.remove();
      await Model3D.findByIdAndUpdate(modelId, { $inc: { likes: -1 } });
      return res.json({ liked: false });
    } else {
      await Like.create({ user: userId, model: modelId });
      await Model3D.findByIdAndUpdate(modelId, { $inc: { likes: 1 } });
      return res.json({ liked: true });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};