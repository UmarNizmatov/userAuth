import userModele from "../models/user.modele.js";
import Myerror from "../utils/myError.js";
import jwt from "jsonwebtoken";
const Validator = (schema) => {
  return async (req, res, next) => {
    try {
      const { error } = schema.validate(req.body);
      if (error) throw error;
      next();
    } catch (error) {
      next(error);
    }
  };
};
const existsEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const existsEmail = await userModele.findOne({ email });
    if (existsEmail) throw new Myerror(400, "email already exists");
  } catch (error) {
    next(error);
  }
};
const refreshTokenValidator = (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const {user} = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
    // const now = new Date.now();
    // const expiresIn = user.iat + user.expiresIn;
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
const accessTokenValidator = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.startsWith("Bearer")
      ? req.headers.authorization.split(" ")[1]
      : req.headers.authorization;
    const {user} = jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY);
    // const now = new Date.now();
    // const expiresIn = user.iat + user.expiresIn;
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") error.status = 401;
    next(error);
  }
};
const roleValidator = (req, res, next) => {
  try {
    const { role } = req.user;
    if (role !== "admin") throw new Myerror(403, "You are not authorized");
    next();
  } catch (error) {
    next(error);
  }
};
export {
  Validator,
  refreshTokenValidator,
  accessTokenValidator,
  roleValidator,
  existsEmail,
};
