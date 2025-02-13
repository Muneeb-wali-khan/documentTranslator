import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUserDetailsQuery } from "../../store/Features/user.feature";
import { useLogout } from "../../hooks/Logout";

const NavbarAuthorized = () => {
  const {logout, isloggingout} = useLogout()
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigation = useNavigate();
  const { data: userData } = useUserDetailsQuery();
  const dropdownRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    {
      label: "Profile",
      icon: FaUserCircle,
      action: () => navigation("/profile"),
    },
    { label: "Settings", icon: FaCog, action: () => navigation("/settings") },
    {
      label: isloggingout ? "Logging out..." : "Logout",
      icon: FaSignOutAlt,
      action: logout,
    },
  ];

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 h-16 bg-themeColor shadow-lg">
      <div className="flex items-center justify-between h-full px-4 md:px-6 mx-auto">
        <div className="flex items-center">
          {/* Left space for sidebar toggle on mobile */}
          <div className="w-12 md:w-0" />
          <h1 className="text-white font-bold text-xl ml-4">{
            userData?.data?.role === "admin" ? "Dashboard Admin" :  userData?.data?.role === "translator" ? "Dashboard Translator" : "Dashboard User" 
            }</h1>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors hover:bg-gray-800"
          >
            <FaUserCircle className="text-white text-2xl" />
            <span className="hidden md:block text-white font-medium">
              {userData?.data?.username || "User"}
            </span>
          </button>

          {isProfileOpen && (
            <div className="absolute right-[0] mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-center">
                  <FaUserCircle className="text-gray-700 text-3xl" />
                </div>
                <p className="text-center mt-2 text-sm font-medium text-gray-700">
                  {userData?.data?.username || "User"}
                </p>
              </div>

              <div className="py-2">
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={item.action}
                    disabled={isloggingout && item.label === "Logout"}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    <item.icon className="text-gray-500" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarAuthorized;
