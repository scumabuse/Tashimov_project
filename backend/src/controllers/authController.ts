import jwt from "jsonwebtoken";
import User from "../models/User.ts";
import type { Request, Response } from "express";

const signToken = (user: any) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );
};

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: "Missing fields" });

    const exists = await User.findOne({ username });
    if (exists)
      return res.status(400).json({ message: "User already exists" });

    const user = new User({ username, password });
    await user.save();

    const token = signToken(user);
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { emailOrUsername, password } = req.body;
    if (!emailOrUsername || !password)
      return res.status(400).json({ message: "Missing fields" });

    const user = await User.findOne({
      $or: [{ username: emailOrUsername }],
    });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    // @ts-ignore
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = signToken(user);
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const me = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user)
      return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};