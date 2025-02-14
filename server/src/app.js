import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);


app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(morgan("dev"));

// import routes
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import documentRouter from "./routes/document.route.js";
import translationLogsRouter from "./routes/translationlogs.route.js";

// use routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/document", documentRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/logs", translationLogsRouter);


// middleware to show error response in json send to client
// comment it when developing backend to trace error

app.use((error,req,res,next)=>{
  error.statusCode = error.statusCode || 500;
  error.statusCode = error.statusCode || "error";
  res.status(error.statusCode).json({
    statusCode: error.statusCode,
    message: error.message,
  })

})


export { app };
