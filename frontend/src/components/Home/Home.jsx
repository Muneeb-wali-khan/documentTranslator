import React, { useEffect, useState } from "react";
import Navbar from "../Nav/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import CheckTokenExp from "../../utils/CheckTokenExp";
import Footer from "../Footer/Footer";

const Home = () => {
  const [validUser, setvalidUser] = useState(false);
  const [role, setRole] = useState(null);

  // Handler functions to ensure state updates are functions
  const handleSetValidUser = (value) => {
    setvalidUser(value);
  };

  const handleSetRole = (value) => {
    setRole(value);
  };

  return (
    <>
      <Navbar validUser={validUser} role={role} />
      <div>
        <CheckTokenExp
          setvalidUser={handleSetValidUser}
          setRole={handleSetRole}
        />
        {/*  hero section */}
        <section className="text-gray-400 w-full" id="home">
          <div className="container mx-auto flex px-5 py-20 md:flex-row flex-col items-center md:px-5">
            <div className="lg:max-w-lg lg:w-full md:w-1/2 md:mb-0 mb-10">
              <img
                className="object-cover object-center rounded"
                alt="Translator"
                src="./icon-192.png"
                width={400}
                height={400}
              />
            </div>
            <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
              <h1 className="text-2xl lg:text-5xl mb-6 font-medium text-gray-700 uppercase">
                <span className="md:mb-4 block font-extrabold">
                  Digital Translator
                </span>
              </h1>

              <p className="mb-8 leading-relaxed text-gray-400 text-md selection:text-red-500">
                Usmania Blood Bank serves as both a foundation and a blood bank,
                playing a vital role in our community's health. Through our dual
                mission, we aim to save lives by facilitating blood donations
                and providing essential medical support.
              </p>
              <div className="flex justify-center">
                <button className="text-md inline-flex transition-all text-white bg-gradient-to-r from-[#2b2c33] to-[#b3b3b3]  border-0 py-2 px-6 focus:outline-none active:text-red-400 rounded md:text-lg">
                  Translate Now
                </button>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default Home;