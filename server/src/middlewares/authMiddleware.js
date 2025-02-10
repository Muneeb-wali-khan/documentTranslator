import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { UserModel } from "../models/User.js";

export const authenticateUser = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized no token");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // find user by id in decoded token
    const user = await UserModel.findById(decodedToken?._id).select(
      "-password"
    );
console.log(user);

    if (!user) {
      throw new ApiError(401, "invalid token !");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "invalid access token !");
  }
});

export const authorizeRole = (role) => (req, res, next) => {
  if (req.user.role !== role)
    throw new ApiError(
      403,
      `User with role ${req.user.role} is not allowed to access this resource`
    );
  next();
};
