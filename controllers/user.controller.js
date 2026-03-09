import userModele from "../models/user.modele.js";
import Myerror from "../utils/myError.js";
import myResponse from "../utils/responser.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

const SignUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let user = await userModele.create({ name, email, password });
    user = user.toObject();
    delete user.password;
    return myResponse(res, 200, "User created", user);
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModele.findOne({ email }).select("+password");
    if (!user) throw new Myerror(404, "User not found", null);
    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Myerror(401, "Password is not match", null);
    const refreshToken = generateRefreshToken(user);
    const accessToken = generateAccessToken(user);
    user.refreshToken = refreshToken;
    await user.save();
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: false });
    return myResponse(res, 200, "Login success", {
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};
const refreshToken = async (req, res, next) => {
  try {
    const user = await userModele.findById(req.user._id);
    if (!user) throw new Myerror(404, "User not found");
    const accessToken = generateAccessToken(user);
    return myResponse(res, 200, "Login success", {
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};
const logout = async (req, res, next) => {
  try {
    const user = await userModele.findById(req.user._id);
    if (!user) throw new Myerror(404, "User not found");
    user.refreshToken = null;
    await user.save();
    res.clearCookie("refreshToken");
    return myResponse(res, 200, "Logout success", null);
  } catch (error) {
    next(error);
  }
};
const getMyprofile = async (req, res, next) => {
  try {
    const user = await userModele.findById(req.user._id);
    if (!user) throw new Myerror(404, "User not found");
    return myResponse(res, 200, "My profile", user);
  } catch (error) {
    next(error);
  }
};
const getAllUsers = async (req, res, next) => {
  try {
    const users = await userModele.find();
    return myResponse(res, 200, "All users", users);
  } catch (error) {
    next(error);
  }
};
export { SignUp, login, logout, refreshToken, getMyprofile, getAllUsers };
