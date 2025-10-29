import express from "express";
import { listCategories } from "../controllers/categoryController.ts";

const router = express.Router();

router.get("/", listCategories);

export default router;