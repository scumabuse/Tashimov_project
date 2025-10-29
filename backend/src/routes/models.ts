import express from "express";
import { createModel, getModels, getModelById, downloadModel } from "../controllers/modelController.ts";
import { auth } from "../middleware/auth.ts";
import { uploadFields } from "../utils/upload.ts";

const router = express.Router();

// list / search
router.get("/", getModels);

// create (auth required) - fields: file, previews[]
router.post(
  "/",
  auth,
  uploadFields.fields([{ name: "file", maxCount: 1 }, { name: "previews", maxCount: 5 }]),
  createModel
);

// get by id
router.get("/:id", getModelById);

// download (increments count)
router.get("/:id/download", downloadModel);

export default router;