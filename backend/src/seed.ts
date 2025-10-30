import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "./models/Category.js";

dotenv.config();

const categories = [
  { name: "Toys", slug: "toys", description: "Toys and miniatures" },
  { name: "Art", slug: "art", description: "Art pieces" },
  { name: "Mechanical", slug: "mechanical", description: "Mechanical models" },
  { name: "Architecture", slug: "architecture", description: "Arch models" },
];

async function run() {
  await mongoose.connect(process.env.MONGO_URI!);
  for (const c of categories) {
    await Category.updateOne({ slug: c.slug }, { $set: c }, { upsert: true });
  } 
  console.log("Seed done");
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});