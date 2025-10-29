import { Schema, model } from "mongoose";

const modelSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  category: { type: String, default: "uncategorized" },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  previewImages: [{ type: String }], // urls to /uploads/...
  filePath: { type: String, required: true }, // path to the model file
  fileName: { type: String, required: true },
  likes: { type: Number, default: 0 },
  downloads: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

modelSchema.index({ title: "text", description: "text", tags: "text" });

export default model("Model3D", modelSchema);