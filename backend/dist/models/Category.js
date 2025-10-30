import { Schema, model } from "mongoose";
const categorySchema = new Schema({
    name: { type: String, unique: true, required: true },
    slug: { type: String, unique: true, required: true },
    description: { type: String, default: "" },
});
export default model("Category", categorySchema);
