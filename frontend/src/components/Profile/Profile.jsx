import React from "react";
import { useUserDetailsQuery } from "../../store/Features/user.feature";
import {
  FaUser,
  FaEnvelope,
  FaShieldAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import Loader from "../Loader/Loader";
import BackButton from "../backButton/BackButton";

const Profile = () => {
  const { data: userData, isLoading } = useUserDetailsQuery();

  if (isLoading) {
    return <Loader />;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <div className=" bg-gray-100 py-8 px-4">
      {userData?.data?.role === "user" && (
        // button back
        <BackButton/>
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
            <button className="px-6 py-3 text-sm font-medium text-white bg-themeColor rounded-lg hover:bg-gray-700 transition-colors w-full sm:w-auto">
              Edit Profile
            </button>
            <button className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
