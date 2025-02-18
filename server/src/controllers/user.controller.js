import { UserModel } from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// --admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await UserModel.find();
  if (!users) throw new ApiError(404, "Users not found");
  return res
    .status(200)
    .json(new ApiResponse(200, users, "Users fetched successfully"));
});

// --admin
const updateUserRole = asyncHandler(async (req, res) => {
  const userid = req.params.id;
  const { role } = req.body;

  const user = await UserModel.findByIdAndUpdate(
    userid,
    { role: role },
    { new: true }
  );
  if (!user) throw new ApiError(404, "User not found");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User role updated successfully"));
});

// --admin
const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
console.log(id);

  if (!id) throw new ApiError(400, "User ID is required");
  if (req.user?._id?.toString() === id)
    throw new ApiError(400, "You cannot delete yourself");

  const findUser = await UserModel.findOne({ _id: id });
  if (!findUser) throw new ApiError(404, "User not found");
  if (findUser?.role === "admin")
    throw new ApiError(400, "You cannot delete an admin");

  // const user = await UserModel.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User deleted successfully"));
});

// get current user details
const getCurrentUser = asyncHandler(async (req, res) => {
  const currentUserid = req.user?._id;

  const findUser = await UserModel.findOne({ _id: currentUserid }).select(
    "-password"
  );

  if (!findUser) {
    throw new ApiError(404, "user not found !");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, findUser, "user fetched successfully !"));
});

// update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const currentUserid = req.user?._id;

  const { username } = req.body;
  if (!username) {
    throw new ApiError(400, "username is required !");
  }

  const findUser = await UserModel.findOne({ _id: currentUserid }).select(
    "-password"
  );

  if (!findUser) {
    throw new ApiError(404, "user not found !");
  }

  const user = await UserModel.findByIdAndUpdate(
    currentUserid,
    { username: username },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "user updated successfully !"));
});

// update user password
const updateUserPassword = asyncHandler(async (req, res) => {
  const currentUserid = req.user?._id;

  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new ApiError(400, "old password and new password are required !");
  }
  if(oldPassword === newPassword){
    throw new ApiError(400, "old password and new password are same !");
  }

  const findUser = await UserModel.findOne({ _id: currentUserid });

  if (!findUser) {
    throw new ApiError(404, "user not found !");
  }

  const isPasswordValid = await findUser.comparePassword(oldPassword);
  if (!isPasswordValid) {
    throw new ApiError(400, "old password is incorrect !");
  }

  findUser.password = newPassword;
  await findUser.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "password updated successfully !"));
});

export { getAllUsers, updateUserRole, deleteUser, getCurrentUser ,updateUserProfile,updateUserPassword};
