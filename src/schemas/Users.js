import mongooseTimeStamp from "mongoose-timestamp";
import mongoDelete from "mongoose-delete";
import mongoosePaginate from "mongoose-paginate-v2";
import generatePaths from "./helpers/generateSchemaPaths.js";

const generateUserSchema = (mongoose) => {
  const { Schema } = mongoose;
  const userSchema = new Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  });
  userSchema.statics.getAllowedProperties = () => {
    return generatePaths({ paths: this.schema.paths, mongoose });
  };

  userSchema.plugin(mongooseTimeStamp);
  userSchema.plugin(mongoosePaginate);
  userSchema.plugin(mongoDelete, {
    deletedAt: true,
    overrideMethods: ["find", "findOne", "countDocuments"],
  });

  return userSchema;
};
export default generateUserSchema;
