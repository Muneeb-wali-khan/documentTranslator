import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckTokenExp from "../../utils/CheckTokenExp";

const Navbar = ({ validUser, role }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="h-100 bg-slate-50 shadow-xl">
      <CheckTokenExp />
      <header className="text-gray-500 body-font">
        <div className="container mx-auto flex flex-wrap py-3 px-5 flex-col md:flex-row items-center justify-between">
          <div className="flex items-center justify-between w-full md:w-auto">
            <a
              className="flex title-font font-medium items-center text-gray-600"
              style={{ cursor: "pointer" }}
            >
              <img
                src="./icon-512.png"
                alt="digital translator"
                title="Usmania Blood Bank Foundation"
                height={62}
                width={62}
              />
              <span className="ml-3 text-md uppercase text-gray-700 font-bold">
                Digital Translator 
              </span>
            </a>
            <button
              className="md:hidden text-gray-600 focus:outline-none"
              onClick={toggleNavbar}
            >
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>

          {/* big screen navbar */}
          <nav
            className={`${
              isOpen ? "hidden" : "hidden"
            } md:flex flex-col md:flex-row font-semibold items-center text-base justify-center w-full md:w-auto`}
          >
            {!validUser === true ? (
              <button
                onClick={() => navigate("/Login")}
                className="inline-flex items-center bg-red-600 text-white border-0 py-1 px-3 focus:outline-none hover:bg-red-700 rounded text-base mt-4 md:mt-0"
              >
                Login
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
            ) : (
              <button
                onClick={() => {
                  if (role === "") {
                    alert("role is required in navbar");
                  }
                  switch (role) {
                    case "admin":
                      navigate("/adminPanel/dashboard");
                      break;
                    case "translator":
                      navigate("/translatorPanel/dashboard");
                      break;
                    case "user":
                      navigate("/userPanel/dashboard");
                      break;
                    default:
                      alert("role is required in navbar");
                      break;
                  }
                }}
                className="inline-flex items-center bg-red-600 text-white border-0 py-1 px-3 focus:outline-none hover:bg-red-700 rounded text-base mt-4 md:mt-0"
              >
                Dashboard
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* small screen nav Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex flex-col items-center mt-8">
          <button
            className="text-gray-600 focus:outline-none mb-4"
            onClick={toggleNavbar}
          >
            <i className="fa-solid fa-times"></i>
          </button>
          <nav className="flex flex-col font-semibold items-center text-base">
            <a
              className="mb-5 hover:text-gray-600 cursor-pointer"
            >
              Our Team
            </a>
            <a
              className="mb-5 hover:text-gray-600 cursor-pointer"
            >
              Testimonials
            </a>
            <a
              className="mb-5 hover:text-gray-600 cursor-pointer"
            >
              Statistics
            </a>
            <a
              className="mb-5 hover:text-gray-600 cursor-pointer"
            >
              FAQs
            </a>
            <button
              className="inline-flex items-center bg-red-600 text-white border-0 py-1 px-3 focus:outline-none hover:bg-red-700 rounded text-base mt-4 md:mt-0"
              onClick={toggleNavbar}
            >
              Login
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleNavbar}
        ></div>
      )}
    </div>
  );
};

export default Navbar;
