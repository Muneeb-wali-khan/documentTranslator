import React, { useState } from "react";
import {
  useUpdatePasswordMutation,
  useUpdateProfileMutation,
  useUserDetailsQuery,
} from "../../store/Features/user.feature";
import {
  FaUser,
  FaEnvelope,
  FaShieldAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import Loader from "../Loader/Loader";
import BackButton from "../backButton/BackButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

const Profile = () => {
  const { data: userData, isLoading } = useUserDetailsQuery();

  const [updatePassword, { isLoading: isLoadingPassword }] =
    useUpdatePasswordMutation();
  const [updateProfile, { isLoading: isLoadingProfile }] =
    useUpdateProfileMutation();

  const [openModalProfile, setOpenModalProfile] = useState(false);
  const [openModalPassword, setOpenModalPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [username, setUsername] = useState("");

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Old password is required"),
      newPassword: Yup.string()
        .min(4, "Password must be at least 4 characters")
        .required("New password is required"),
    }),
    onSubmit: async (values) => {
      // console.log(values);

      await updatePassword(values)
        .unwrap()
        .then((response) => {
          toast.success(response?.message);
          formik.resetForm();
          setOpenModalPassword(false);
        })
        .catch((error) => {
          toast.error(error.data.message);
        });
    },
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleProfile = () => {
    setOpenModalProfile(true);
  };
  const handlePassword = () => {
    setOpenModalPassword(true);
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    if (!username) {
      return toast.error("Please enter a username");
    }
    await updateProfile(username)
      .unwrap()
      .then((response) => {
        toast.success(response?.message);
        setUsername("");
        setOpenModalProfile(false);
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className=" bg-gray-100 py-8 px-4">
        {userData?.data?.role === "user" && (
          // button back
          <BackButton />
        )}
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="bg-gray-900 px-6 py-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="bg-gray-700 rounded-full p-6">
                  <FaUser className="text-4xl md:text-5xl text-gray-300" />
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {userData.data.username}
                  </h1>
                  <p className="text-gray-400 flex items-center justify-center md:justify-start gap-2">
                    <FaEnvelope className="text-gray-500" />
                    {userData.data.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Account Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Account Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FaShieldAlt className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Role</p>
                    <p className="font-medium text-gray-800 capitalize">
                      {userData.data.role}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaClock className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="font-medium text-gray-800">
                      {formatDate(userData.data.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Security Settings
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {userData.data.mfaEnabled ? (
                      <FaCheckCircle className="text-green-500 text-xl" />
                    ) : (
                      <FaTimesCircle className="text-red-500 text-xl" />
                    )}
                    <div>
                      <p className="font-medium text-gray-800">
                        Two-Factor Authentication
                      </p>
                      <p className="text-sm text-gray-500">
                        {userData.data.mfaEnabled ? "Enabled" : "Disabled"}
                      </p>
                    </div>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-themeColor rounded-lg hover:bg-gray-700 transition-colors">
                    {userData.data.mfaEnabled ? "Disable" : "Enable"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleProfile}
              className="px-6 py-3 text-sm font-medium text-white bg-themeColor rounded-lg hover:bg-gray-700 transition-colors w-full sm:w-auto"
            >
              Edit Profile
            </button>
            <button
              onClick={handlePassword}
              className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* modal password */}
      {openModalPassword === true && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white flex m-4 flex-col  rounded-lg shadow-lg p-6 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 max-h-[80vh] ">
            <h2 className="text-lg font-medium mb-4">Update Password</h2>
            {/* two inputs old password new password */}
            <form onSubmit={formik.handleSubmit} className="h-full">
              <div className="flex flex-col justify-between h-full">
                {/* Input 1: Old Password */}
                <div className="mt-2 relative">
                  <label
                    htmlFor="oldPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Old Password
                  </label>
                  <input
                    type={showOldPassword ? "text" : "password"}
                    name="oldPassword"
                    className="mt-1 py-3 px-3 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-400 rounded-md"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.oldPassword}
                  />
                  <div
                    className="absolute inset-y-0 right-3 top-6 flex items-center justify-center cursor-pointer"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                  >
                    {showOldPassword ? (
                      <FaEyeSlash className="text-gray-500" size={20} />
                    ) : (
                      <FaEye className="text-gray-500" size={20} />
                    )}
                  </div>
                  {formik.touched.oldPassword && formik.errors.oldPassword ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.oldPassword}
                    </div>
                  ) : null}
                </div>

                {/* Input 2: New Password */}
                <div className="mb-2 mt-2 relative">
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    New Password
                  </label>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    className="mt-1 py-3 px-3 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-400 rounded-md"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.newPassword}
                  />
                  <div
                    className="absolute inset-y-0 right-3 top-6 flex items-center cursor-pointer"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <FaEyeSlash className="text-gray-500" size={20} />
                    ) : (
                      <FaEye className="text-gray-500" size={20} />
                    )}
                  </div>
                  {formik.touched.newPassword && formik.errors.newPassword ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.newPassword}
                    </div>
                  ) : null}
                </div>

                <div className="flex items-center gap-3 mt-6">
                  <button
                    type="submit"
                    disabled={isLoadingPassword}
                    className="px-4 py-2 w-full bg-themeColor text-white rounded hover:bg-gray-600 transition-colors"
                  >
                    {isLoadingPassword ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={() => setOpenModalPassword(false)}
                    className="px-4 py-2 w-1/3 bg-themeColor text-white rounded hover:bg-gray-600 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* modal profile */}
      {openModalProfile === true && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white flex m-4 flex-col  rounded-lg shadow-lg p-6 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 max-h-[80vh] ">
            <h2 className="text-lg font-medium mb-4">Update Profile</h2>
            {/* two inputs old password new password */}
            <form onSubmit={handleSubmitProfile} className="h-full">
              <div className="flex flex-col justify-between h-full">
                {/* Input 1: username */}
                <div className="mt-2">
                  <label
                    htmlFor="oldPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <input
                    name="username"
                    className="mt-1 py-3 px-3 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-400 rounded-md"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {username === "" ? (
                    <div className="text-red-500 text-sm">
                      <p>username is required !</p>
                    </div>
                  ) : null}
                </div>
                <div className="flex items-center gap-3 mt-6">
                  <button
                    type="submit"
                    disabled={isLoadingProfile}
                    className="px-4 py-2 w-full bg-themeColor text-white rounded hover:bg-gray-600 transition-colors"
                  >
                    {isLoadingProfile ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={() => setOpenModalProfile(false)}
                    className="px-4 py-2 w-1/3 bg-themeColor text-white rounded hover:bg-gray-600 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
