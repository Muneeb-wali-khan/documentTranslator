import React, { useState } from "react";
import { useMyDocumentsUQuery } from "../../../store/Features/documents.feature";
import Loader from "../../../components/Loader/Loader";
import { FaFile, FaLanguage, FaSearch, FaCopy, FaUpload } from "react-icons/fa";
import { usePagination } from "../../../utils/pagination";
import { toast } from "react-hot-toast";
import PaginationBtn from "../../../components/PaginationBtn/PaginationBtn";
import { useNavigate } from "react-router-dom";

function MyDocs() {
  const navigate = useNavigate();
  const { data: docData, isLoading } = useMyDocumentsUQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [certifyStatusFilter, setCertifyStatusFilter] = useState("all");
  const [seeMore, setSeeMore] = useState(false);
  const [seeMoreT, setSeeMoreT] = useState(false);
  const [currentInd, setCurrentInd] = useState(null);
  const [currentIndT, setCurrentIndT] = useState(null);
  const itemsPerPage = 5;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Translation copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy translation");
    }
  };

  const filteredDocuments =
    docData?.data.filter((doc) => {
      const matchesSearch = doc.originalFileName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || doc.status === statusFilter;
      const matchesCertifyStatus =
        certifyStatusFilter === "all" ||
        doc.certificationStatus === certifyStatusFilter;
      return matchesSearch && matchesStatus && matchesCertifyStatus;
    }) || [];

  const { totalPages, paginate } = usePagination(
    filteredDocuments,
    itemsPerPage
  );
  const currentDocuments = paginate(filteredDocuments, currentPage);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <button className="text-2xl font-bold text-gray-900">
              My Documents
            </button>
            <span className="text-sm text-gray-500">
              Total Documents: {filteredDocuments.length}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white" />
              <input
                type="text"
                placeholder="Search documents..."
                className="w-full text-white bg-themeColor pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* certify status */}
            <select
              className="px-4 py-2 bg-themeColor text-white border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={certifyStatusFilter}
              onChange={(e) => setCertifyStatusFilter(e.target.value)}
            >
              <option value="all">Certify Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>

            {/* status final translation */}
            <select
              className="px-4 py-2 bg-themeColor text-white border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Translation Status</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="translated">Translated</option>
            </select>

            <div>
              <button
                onClick={() => navigate("/userPanel/uploadfile")}
                className="px-4 flex items-center gap-2 bg-themeColor py-2 text-sm font-medium text-white border border-gray-300 rounded-lg hover:bg-gray-700 disabled:opacity-50"
              >
                Upload
                <FaUpload />
              </button>
            </div>
          </div>
        </div>

        {/* Documents List */}
        <div className="space-y-8">
          {currentDocuments.map((doc,index) => (
            <div
              key={doc._id}
              className="bg-themeColor rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="flex  items-start  gap-3 mb-2">
                      <FaFile className="text-gray-400" />
                      <h3 className="text-lg font-medium text-white">
                        {doc.originalFileName}
                      </h3>
                      <div className="flex flex-col gap-2 items-center sm:flex-row sm:items-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            doc.status === "translated"
                              ? "bg-green-100 text-green-800"
                              : doc.status === "failed"
                              ? "bg-yellow-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {doc.status}
                        </span>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            doc.certificationStatus === "approved"
                              ? "bg-green-100 text-green-800"
                              : doc.certificationStatus === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-yellow-100 text-red-800"
                          }`}
                        >
                          {doc.certificationStatus}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                      <FaLanguage />
                      <span>
                        {doc.sourceLanguage} → {doc.targetLanguage}
                      </span>
                      <span className="text-gray-400">|</span>
                      <span>{formatDate(doc.createdAt)}</span>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-400 mb-1">
                        Original Text:
                      </h4>
                      <p
                        style={{ whiteSpace: "pre-line" }}
                        className="text-sm text-gray-600 bg-gray-100 p-3 rounded"
                      >
                        {doc.originalText.length > 100 ? (
                          <>
                            {seeMore && currentInd === index ? (
                              <>
                                {doc.originalText}
                                <button
                                  onClick={() => {
                                    setSeeMore(false);
                                    setCurrentInd(null);
                                  }}
                                  className="text-blue-500 underline ml-2"
                                >
                                  See Less
                                </button>
                              </>
                            ) : (
                              <>
                                {doc.originalText.slice(0, 100)}...
                                <button
                                  onClick={() => {
                                    setSeeMore(true);
                                    setCurrentInd(index);
                                  }}
                                  className="text-blue-500 underline ml-2"
                                >
                                  See More
                                </button>
                              </>
                            )}
                          </>
                        ) : (
                          doc.originalText
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {doc.translatedText && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-400">
                        Translation:
                      </h4>
                      <button
                        onClick={() => copyToClipboard(doc.translatedText)}
                        className="flex items-center gap-2 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      >
                        <FaCopy />
                        Copy
                      </button>
                    </div>
                    <p
                      style={{ whiteSpace: "pre-line" }}
                      className="text-sm text-gray-700 bg-gray-50 p-3 rounded mt-1"
                    >
                      {doc.translatedText.length > 100 ? (
                        <>
                          {seeMoreT && currentIndT === index ? (
                            <>
                              {doc.translatedText}
                              <button
                                onClick={() => {
                                  setSeeMoreT(false);
                                  setCurrentInd(null);
                                }}
                                className="text-blue-500 underline ml-2"
                              >
                                See Less
                              </button>
                            </>
                          ) : (
                            <>
                              {doc.translatedText.slice(0, 100)}...
                              <button
                                onClick={() => {
                                  setSeeMoreT(true);
                                  setCurrentIndT(index);
                                }}
                                className="text-blue-500 underline ml-2"
                              >
                                See More
                              </button>
                            </>
                          )}
                        </>
                      ) : (
                        doc.translatedText
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <PaginationBtn
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </>
  );
}

export default MyDocs;
