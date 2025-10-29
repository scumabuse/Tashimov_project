import express from "express";
import { createModel, getModels, getModelById, downloadModel } from "../controllers/modelController.js";
import { auth } from "../middleware/auth.js";
import { uploadFields } from "../utils/upload.js";

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