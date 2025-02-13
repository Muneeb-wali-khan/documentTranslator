import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUser,
  FaChartBar,
  FaBox,
  FaClipboardList,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { useLogout } from "../../hooks/Logout";

const SidebarAdmin = () => {
  const { logout, isloggingout } = useLogout();
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: MdDashboard, text: "Dashboard", path: "/adminPanel/dashboard" },
    { icon: FaUser, text: "Users", path: "/adminPanel/allUsers" },
    { icon: FaChartBar, text: "Analytics", path: "/adminPanel/analytics" },
    { icon: FaBox, text: "Products", path: "/adminPanel/products" },
    { icon: FaClipboardList, text: "Orders", path: "/adminPanel/orders" },
    { icon: FaCog, text: "Settings", path: "/adminPanel/settings" },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-900 text-white md:hidden"
      >
        {isOpen ? (
          <IoMdClose className="text-2xl" />
        ) : (
          <HiMenuAlt3 className="text-2xl" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed  left-0 h-full z-40 transition-transform duration-300
        md:translate-x-0 md:relative
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        min-h-screen w-64 bg-gray-900 text-gray-100 py-6 px-4
      `}
      >
        {/* <div className="mb-20">
        </div> */}

        <nav>
          <ul className="flex flex-col gap-2">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              const isItemHovered = isHovered === index;

              return (
                <li key={item.text}>
                  <Link
                    to={item.path}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                      ${isActive ? "bg-blue-600 text-white" : "text-gray-300"}
                      ${
                        !isActive && isItemHovered
                          ? "bg-gray-800 text-white"
                          : ""
                      }
                      hover:bg-gray-800 hover:text-white
                    `}
                    onMouseEnter={() => setIsHovered(index)}
                    onMouseLeave={() => setIsHovered(null)}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon
                      className={`text-xl ${
                        isActive ? "text-white" : "text-gray-400"
                      }`}
                    />
                    <span className="font-medium">{item.text}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto pt-8">
          <div className="h-0.5 bg-gray-700 w-full mb-4"></div>
          <button onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-red-400 hover:bg-gray-800 hover:text-red-300 transition-all duration-200">
            <FaSignOutAlt className="text-xl" />
            <span className="font-medium">{isloggingout ? "Loading.." : "Logout"}</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SidebarAdmin;
