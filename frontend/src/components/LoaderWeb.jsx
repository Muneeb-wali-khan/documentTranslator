import React from "react";

const LoaderWeb = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
      <div className="relative">
        {/* animated circles */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-16 border-4 border-blue-500 rounded-full border-t-transparent animate-spin" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-24 w-24 border-4 border-red-500 rounded-full border-t-transparent animate-spin" style={{ animationDuration: '2s' }} />
        </div>
        
        {/* central icon */}
        <div className="relative z-10 bg-gray-900 p-4 rounded-full">
          <svg 
            className="h-12 w-12 text-white animate-pulse" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
            />
          </svg>
        </div>
      </div>
      
      {/* Text */}
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-2 animate-pulse">
          Digital Translator
        </h2>
        <p className="text-gray-400 text-sm">
          Loading your translation environment...
        </p>
      </div>
    </div>
  );
};

export default LoaderWeb;