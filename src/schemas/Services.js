import mongooseTimeStamp from "mongoose-timestamp";
import mongoDelete from "mongoose-delete";
import mongoosePaginate from "mongoose-paginate-v2";
import generatePaths from "./helpers/generateSchemaPaths.js";
import { SchemaTypes } from "mongoose";
import path from "path"
const generateServiceSchema = (mongoose) => {
  const { Schema } = mongoose;
  const servicesSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    category: {
      type: SchemaTypes.ObjectId, 
      ref: "Categories"
    }
  });
  servicesSchema.statics.getAllowedProperties = () => {
    return generatePaths({ paths: path.dirname, mongoose });
  };

  servicesSchema.plugin(mongooseTimeStamp);
  servicesSchema.plugin(mongoosePaginate);
  servicesSchema.plugin(mongoDelete, {
    deletedAt: true,
    overrideMethods: ["find", "findOne", "countDocuments"],
  });

  return servicesSchema;
};
export default generateServiceSchema;
