import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import errorHandler from "./middlewares/erroHandler.middleware.js";
const app = express();
app.use(bodyParser.json());
app.use(cookieParser())
app.use("/auth",userRouter)
app.use(errorHandler)
export default app;
