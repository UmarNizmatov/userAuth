import userModele from "../models/user.js";
import Myerror from "../utils/myError.js";
import jwt from "jsonwebtoken";
const Validator = (schema) => {
  return async (req, res, next) => {
    try {
      const { error } = schema.validate(req.body);
      if (error) throw error;
      const { email } = req.body;
      const existsEmail = await userModele.findOne({ email });
      if (existsEmail) throw new Myerror(400, "email already exists");
      next();
    } catch (error) {
      next(error);
    }
  };
};
const refreshTokenValidator =(req,res,next)=>{
    try {
        const refreshToken = req.cookies.refreshToken;
        const user = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const now = new Date.now();
        const expiresIn = user.expiresIn;

        req.user = user;
        next()
    } catch (error) {
        next(error);
    }
}
export { Validator };
