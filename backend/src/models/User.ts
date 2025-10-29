import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: "" },
  bio: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.pre("save", async function (next) {
  // hash only if password was modified or is new
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  // @ts-ignore
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default model("User", userSchema);