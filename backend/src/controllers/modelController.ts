import { Request, Response } from "express";
import Model3D from "../models/Model3D.js";
import Like from "../models/Like.js";
import User from "../models/User.js";
import fs from "fs";
import path from "path";

export const createModel = async (req: any, res: Response) => {
  try {
    // Expect fields: title, description, category, tags (comma separated optional)
    // files: file (single), previews (array)
    const { title, description = "", category = "uncategorized", tags = "" } = req.body;
    if (!title) return res.status(400).json({ message: "Title required" });

    const fileField = req.files?.file?.[0];
    if (!fileField) return res.status(400).json({ message: "3D model file is required" });

    const previewFiles = req.files?.previews || [];
    const previewPaths = previewFiles.map((f: any) => "/" + f.path.replace(/\\/g, "/"));

    const model = new Model3D({
      title,
      description,
      category,
      user: req.user.id,
      previewImages: previewPaths,
      filePath: "/" + fileField.path.replace(/\\/g, "/"),
      fileName: fileField.originalname,
      tags: tags ? tags.split(",").map((t: string) => t.trim()) : [],
    });

    await model.save();
    // update user's modelsCount optional (not implemented field but you can)
    res.json({ model });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getModels = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20, search = "", category, sort } = req.query as any;
    const skip = (page - 1) * limit;
    const filter: any = {};
    if (search) filter.$text = { $search: search };
    if (category) filter.category = category;

    let query = Model3D.find(filter).populate("user", "username avatar").sort({ createdAt: -1 });
    if (sort === "downloads") query = Model3D.find(filter).sort({ downloads: -1 });
    if (sort === "likes") query = Model3D.find(filter).sort({ likes: -1 });

    const total = await Model3D.countDocuments(filter);
    const models = await query.skip(skip).limit(Number(limit)).exec();
    res.json({ total, page: Number(page), models });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getModelById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const model = await Model3D.findById(id).populate("user", "username avatar");
    if (!model) return res.status(404).json({ message: "Not found" });
    res.json({ model });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const downloadModel = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const model = await Model3D.findById(id);
    if (!model) return res.status(404).json({ message: "Not found" });

    // increment downloads
    model.downloads = (model.downloads || 0) + 1;
    await model.save();

    const filePath = path.join(process.cwd(), model.filePath); // model.filePath like /uploads/models/...
    if (!fs.existsSync(filePath)) return res.status(404).json({ message: "File not found" });

    res.download(filePath, model.fileName);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};