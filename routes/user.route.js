import { Router } from "express";
import { Validator } from "../middlewares/validators.middleware.js";
import {userSchema,userLoginSchema} from "../validators/user.validator.js";
import { SignUp } from "../controllers/user.controller.js";

const userRouter = new Router();
userRouter.post("/register", Validator(userSchema), SignUp);
userRouter.post("/login", Validator(userLoginSchema), SignUp);
export default userRouter;
