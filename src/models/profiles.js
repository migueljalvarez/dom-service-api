import mongoose from "mongoose";
import { generateProfileSchema as ProfileSchema} from "../schemas/index";
const profileModel = mongoose.model("Profile", ProfileSchema(mongoose));

export { profileModel };
