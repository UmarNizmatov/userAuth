import { Router } from "express";
import {
  accessTokenValidator,
  existsEmail,
  refreshTokenValidator,
  roleValidator,
  Validator,
} from "../middlewares/validators.middleware.js";
import { userSchema, userLoginSchema } from "../validators/user.validator.js";
import {
  logout,
  refreshToken,
  SignUp,
  getMyprofile,
  login,
  getAllUsers,
} from "../controllers/user.controller.js";

const userRouter = new Router();
userRouter.post("/register", Validator(userSchema),existsEmail, SignUp);
userRouter.post("/login", Validator(userLoginSchema), login);
userRouter.post("/refresh", refreshTokenValidator, refreshToken);
userRouter.post("/logout", logout);
userRouter.get("/profile", accessTokenValidator, getMyprofile);
userRouter.get("/users",accessTokenValidator,roleValidator,getAllUsers)
export default userRouter;
