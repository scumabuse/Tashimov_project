import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "./server";
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5000;
// ✅ Подключаем MongoDB
mongoose
    .connect("mongodb://127.0.0.1:27017/tashimov_db")
    .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
})
    .catch((err) => console.error("❌ MongoDB error:", err));
