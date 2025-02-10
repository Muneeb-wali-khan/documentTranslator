import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/User.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// cookie oprions
const cookieOptions = {
  httpOnly: true,
  secure: true, // false because i don't have https ssl
  // secure: true, // false because i don't have https ssl
  sameSite: "None",
  maxAge: 24 * 60 * 60 * 1000, // 1 day
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) throw new ApiError(400, "User already exists");

    // // Create new user
    const user = await UserModel.create({
      username: username,
      email: email,
      password: password,
      role: role,
    });
    console.log(user);

    return res
      .status(201)
      .json(new ApiResponse(200, user, "User registered successfully"));
  } catch (error) {
    throw new ApiError(500, "Error registering user");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await UserModel.findOne({ email: email });
  if (!user) {
    throw new ApiError(401, "user not found !");
  }

  // Validate password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) throw new ApiError(401, "Invalid password !");

  // // Generate JWT token
  const token = await user.generateToken();

  const logedinUser = await UserModel.findById(user?._id).select("-password");

  return res
    .status(200)
    .cookie("token", token, cookieOptions)
    .json(
      new ApiResponse(200, { user: logedinUser }, "User logged in successfully")
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .clearCookie("token")
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

export { registerUser, loginUser, logoutUser };
