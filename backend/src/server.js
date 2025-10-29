import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import modelRoutes from "./routes/models.js";
import userRoutes from "./routes/users.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use("/api/auth", authRoutes);
app.use("/api/models", modelRoutes);
app.use("/api/users", userRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));