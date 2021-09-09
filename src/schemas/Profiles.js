import mongooseTimeStamp from "mongoose-timestamp";
import mongoDelete from "mongoose-delete";
import mongoosePaginate from "mongoose-paginate-v2";
import generatePaths from "./helpers/generateSchemaPaths.js";
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
    documentType: {
      type: String,
      enum: ["CC", "CE", "PEP", "PA", "OTHER"],
      required: true,
    },
    documentNumber: {
      type: Number,
      required: true,
    },
    user: {
      type: SchemaTypes.ObjectId, 
      ref: "Users"
    }
  });
  profileSchema.statics.getAllowedProperties = () => {
    return generatePaths({ paths: this.schema.paths, mongoose });
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
