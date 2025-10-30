import { Schema, model } from "mongoose";
const likeSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    model: { type: Schema.Types.ObjectId, ref: "Model3D", required: true },
    createdAt: { type: Date, default: Date.now },
});
likeSchema.index({ user: 1, model: 1 }, { unique: true });
export default model("Like", likeSchema);
