import app from "./app.js";
import env from "dotenv";
import dbConnect from "./config/db.js";
env.config();
dbConnect();
app.listen(3000, () => {
  console.log("Server is running...");
});
