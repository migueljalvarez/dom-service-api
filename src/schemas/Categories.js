import mongooseTimeStamp from "mongoose-timestamp";
import mongoDelete from "mongoose-delete";
import mongoosePaginate from "mongoose-paginate-v2";
import generatePaths from "./helpers/generateSchemaPaths.js";
import path from "path"
const generateCategorySchema = (mongoose) => {
  const { Schema } = mongoose;
  const categorySchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
  });
  categorySchema.statics.getAllowedProperties = () => {
    return generatePaths({ paths: path.dirname, mongoose });
  };

  categorySchema.plugin(mongooseTimeStamp);
  categorySchema.plugin(mongoosePaginate);
  categorySchema.plugin(mongoDelete, {
    deletedAt: true,
    overrideMethods: ["find", "findOne", "countDocuments"],
  });

  return categorySchema;
};
export default generateCategorySchema;
