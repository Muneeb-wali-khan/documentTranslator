import express from "express";

const router = express.Router()
// import { upload } from "../middlewares/multerMiddleware.js";
import { loginUser, logoutUser, registerUser } from "../controllers/auth.controller.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";


router.route("/register-user").post(registerUser);
router.route("/login-user").post(loginUser);
router.route("/logout-user").post(authenticateUser,logoutUser);


export default router;