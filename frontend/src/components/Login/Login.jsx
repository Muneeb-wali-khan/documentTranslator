import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResetNavigations } from "../../utils/ResetNavigations";
import CheckTokenExp from "../../utils/CheckTokenExp";
import { useLoginMutation } from "../../store/Features/auth.feature";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({
      email,
      password,
    });

    const res = await login({
      email,
      password,
    })
      .unwrap()
      .then(async (res) => {
        const { token, user } = res?.data;
        console.log("data",token,user);
        if (token && user) {
          toast(res?.message);
          alert(JSON.stringify(res?.message));
          localStorage.setItem("token", res?.data?.token);
          localStorage.setItem("role", res?.data?.user?.role);
          switch (res?.data?.user?.role) {
            case "admin":
              navigate("/adminPanel/dashboard");
              ResetNavigations("HomeAdmin");
              break;

            case "translator":
              navigate("/translatorPanel/dashboard");
              ResetNavigations("HomeTranslator");
              break;

            case "user":
              navigate("/userPanel/dashboard");
              ResetNavigations("HomeUser");
              break;

            default:
              null;
          }
        }
      })
      .catch((err) => {
        if (err?.data?.message) {
          console.log(err);
          alert(JSON.stringify(err?.data?.message));
        }
      });
  };

  return (
    <>
    <CheckTokenExp/>
      <div className="m-8">
        <button
          onClick={() => navigate(-1)}
          className="p-1 w-20 bg-red-700 text-white rounded-md"
        >
          <i className="fa fa-arrow-left"></i> Back
        </button>
      </div>
      <div className="flex justify-center min-h-[100%]">
        <div className="bg-white border-4 p-8 rounded-lg shadow-lg max-w-md w-full transform transition-all duration-500 ease-in-out hover:scale-105">
          <h2 className="text-3xl font-bold text-center text-gray-700 mb-6 animate-fadeIn">
            <i>Login</i> <i className=" fa-solid fa-lock block"></i>
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6 ">
            <div className="relative">
              <label
                className="block text-gray-700 font-semibold mb-2 ml-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="relative">
              <label
                className="block text-gray-700 font-semibold mb-2 ml-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                disabled={isLoading}
                type="submit"
                className="bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transform transition duration-300 ease-in-out hover:scale-105"
              >
                {isLoading ? "Loading..." : "Login"}
              </button>
              <a
                href="#"
                className="text-sm text-indigo-600 hover:underline transform transition duration-300 ease-in-out hover:scale-105"
              >
                Forgot password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
