import Category from "../models/Category.ts";
export const listCategories = async (req, res) => {
    try {
        const cats = await Category.find().sort({ name: 1 });
        res.json({ categories: cats });
    }
    catch {
        res.status(500).json({ message: "Server error" });
    }
};
