import React from "react";

function PaginationBtn({currentPage,setCurrentPage,totalPages}) {
  return (
    <div className="mt-6 flex items-center justify-between">
      <button
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <div className="flex items-center gap-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`w-8 h-8 rounded-lg text-sm font-medium ${
              currentPage === index + 1
                ? "bg-themeColor text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <button
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default PaginationBtn;
