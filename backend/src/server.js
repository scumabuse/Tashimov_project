import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.ts";
import userRoutes from "./routes/users.ts";
import modelsRouter from "./routes/models.ts";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/sketchfab-clone";

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use("/uploads", express.static("uploads"));
app.use("/api/models", modelsRouter);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/api/test", (req, res) => {
  res.json({ message: "API работает!" });
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));