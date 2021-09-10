import mongoose from "mongoose";
import { generateUserSchema as UserSchema } from "../schemas/index";
const User = mongoose.model("User", UserSchema(mongoose));

export default User;
