import mongoose from "mongoose";
import { generateCategorySchema as CategorySchema } from "../schemas/index";
const Category = mongoose.model("Category", CategorySchema(mongoose));

export default Category;
