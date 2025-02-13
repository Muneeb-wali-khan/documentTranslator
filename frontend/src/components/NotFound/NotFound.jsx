import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {

  return (
    <div className="h-full flex items-center justify-center  px-4">
      <div className="text-center">
        <div className="flex justify-center mb-8">
          <FaExclamationTriangle className="text-6xl text-red-500 animate-bounce" />
        </div>
        
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-red-500 mb-6">Page Not Found</h2>
        
      </div>
    </div>
  );
};

export default NotFound;