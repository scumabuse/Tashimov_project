import express from "express";
import { toggleLike } from "../controllers/likeController.ts";
import { auth } from "../middleware/auth.ts";
const router = express.Router();
router.post("/:id/toggle", auth, toggleLike);
export default router;
