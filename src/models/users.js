import mongoose from "mongoose";
import { generateUserSchema as UserSchema} from "../schemas/index";
const userModel = mongoose.model("User", UserSchema(mongoose));

export { userModel };
