import dotenv from "dotenv";
import color from "colors";
import { app } from "./app.js";
import connectDB from "./config/db.js";
const PORT = process.env.PORT || 5000;

dotenv.config({
  path: "./.env",
});

app.on("error", (error) => {
  console.log("ERROR", error);
  throw error;
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`.yellow.bold);
    });
  })
  .catch((err) => {
    console.log("database connection error !! ", err);
  });
