import express from "express";
import { toggleLike } from "../controllers/likeController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/:id/toggle", auth, toggleLike);

export default router;