import mongoose from "mongoose";
import { generateServiceSchema as ServiceSchema} from "../schemas/index";
const serviceModel = mongoose.model("Service", ServiceSchema(mongoose));

export { serviceModel };
