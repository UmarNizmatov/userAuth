import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";

const app = express();
app.use(bodyParser.json());
app.use(cookieParser())
app.use("/auth",userRouter)
export default app;
