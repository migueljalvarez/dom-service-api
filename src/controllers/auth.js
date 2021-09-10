import asyncWrap from "../utils/asyncWrap.js";
import AplicationError from "../utils/AplicationError.js";
import User from "../services/users";
import bcrypt from "bcryptjs";
import JWT from "../middlewares/Jwt.js";
const auth = asyncWrap(async (req, res, next) => {
  const { email, password, uid } = req.body;
  let query;
  if (uid) {
    query = { email, uid };
  } else {
    const passwordHash = bcrypt.hashSync(password, 10);
    if (bcrypt.compare(password, passwordHash)) {
      query = { email };
    } else {
      throw new AplicationError("Wrong email/password combination", 401);
    }
  }
  const user = await User.customFindOne(query);
  if (!user) {
    throw new AplicationError("user not registered / not verified", 401);
  }
  req.user = user;
  next();
});

const login = asyncWrap(async (req, res) => {
  const payload = {
    id: req.user._id,
  };
  const { remenber } = req.body;
  const token = JWT.sign(payload, remenber);
  if (token) {
    res.status(200).json({
      token: token,
    });
  }
});
const AuthController = { auth, login };
export default AuthController;
