import mongooseTimeStamp from "mongoose-timestamp";
import mongoDelete from "mongoose-delete";
import mongoosePaginate from "mongoose-paginate-v2";
import generatePaths from "./helpers/generateSchemaPaths.js";
import path from "path"
const generateUserSchema = (mongoose) => {
  const { Schema } = mongoose;
  const userSchema = new Schema({
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    uid: {
      type: String,
      unique: true,
    }
  });
  userSchema.statics.getAllowedProperties = () => {
    return generatePaths({ paths: path.dirname, mongoose });
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
