import React from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";

function BackButton() {
  return (
    <div className="flex justify-start mb-6 pl-4">
      <button
        className="bg-themeColor flex items-center gap-1 hover:bg-gray-700 text-white font-bold py-1 px-4 rounded"
        onClick={() => window.history.back()}
      >
        <FaArrowAltCircleLeft /> Back
      </button>
    </div>
  );
}

export default BackButton;
