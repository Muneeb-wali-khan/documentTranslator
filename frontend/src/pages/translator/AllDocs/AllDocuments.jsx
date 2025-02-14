import React, { useState } from "react";
import { useAllDocumentsTQuery } from "../../../store/Features/documents.feature";
import Loader from "../../../components/Loader/Loader";
import { FaSearch,} from "react-icons/fa";
import { usePagination } from "../../../utils/pagination";
import PaginationBtn from "../../../components/PaginationBtn/PaginationBtn";
import DocumentCard from "./documentCard/DocumentCard";

function AllDocuments() {
  const { data: docData, isLoading } = useAllDocumentsTQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [certifyStatusFilter, setCertifyStatusFilter] = useState("all");

  const itemsPerPage = 3;

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
      <div className="max-w-7xl mx-auto px-4 py-8 pt-0">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <button className="text-2xl font-bold text-gray-900">
              All Documents
            </button>
            <span className="text-sm text-gray-500">
              Total Documents: {filteredDocuments.length}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white" />
              <input
                type="text"
                placeholder="Search documents..."
                className="w-full text-white bg-themeColor pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* certify status */}
            <select
              className="p-2 py-3 bg-themeColor text-white border rounded-lg focus:ring-2 focus:ring-blue-500"
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
            
              className="px-4 py-3 bg-themeColor text-white border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Translation Status</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="translated">Translated</option>
            </select>
          </div>
        </div>

        {
          filteredDocuments?.length === 0 ? (
            <div className="text-center text-gray-500">
              No documents found.
            </div>
          ) : (
            <DocumentCard currentDocuments={currentDocuments} />
          )
        }
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

export default AllDocuments;
