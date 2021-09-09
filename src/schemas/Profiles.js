import mongooseTimeStamp from "mongoose-timestamp";
import mongoDelete from "mongoose-delete";
import mongoosePaginate from "mongoose-paginate-v2";
import generatePaths from "./helpers/generateSchemaPaths.js";
import path from "path";
import { SchemaTypes } from "mongoose";
const generateProfileSchema = (mongoose) => {
  const { Schema } = mongoose;
  const profileSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    experience: {
      type: String,
      required: false,
    },
    documentType: {
      type: String,
      enum: ["CC", "CE", "PEP", "PA", "OTHER"],
      required: true,
    },
    documentNumber: {
      type: Number,
      required: true,
    },
    userType: {
      type: String,
      enum: ["ADMIN", "USER"],
      required: true,
      default: "USER",
    },
    user: {
      type: SchemaTypes.ObjectId,
      ref: "Users",
    },
  });
  profileSchema.statics.getAllowedProperties = () => {
    return generatePaths({ paths: path.dirname, mongoose });
  };

  profileSchema.plugin(mongooseTimeStamp);
  profileSchema.plugin(mongoosePaginate);
  profileSchema.plugin(mongoDelete, {
    deletedAt: true,
    overrideMethods: ["find", "findOne", "countDocuments"],
  });

  return profileSchema;
};
export default generateProfileSchema;
