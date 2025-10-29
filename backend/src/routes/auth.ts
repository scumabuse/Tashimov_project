import express from "express";
import { register, login, me } from "../controllers/authController.ts";
import { auth } from "../middleware/auth.ts";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, me);

export default router;