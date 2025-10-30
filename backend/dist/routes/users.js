import express from "express";
const router = express.Router();
// Заглушка — просто чтобы сервер не падал
router.get("/", (req, res) => {
    res.json({ message: "Users route OK" });
});
export default router;
