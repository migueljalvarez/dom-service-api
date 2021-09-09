import mongoose from "mongoose";
import { generateCategorySchema as CategorySchema } from "../schemas/index";
const categoryModel = mongoose.model("Category", CategorySchema(mongoose));

export { categoryModel };
