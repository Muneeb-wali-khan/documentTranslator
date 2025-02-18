import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaCopy, FaLanguage, FaFile } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  useCertifyDocumentTMutation,
  useTranslateDocumentTMutation,
} from "../../../../store/Features/documents.feature";

function DocumentCard({ currentDocuments }) {
  // const navigator = useNavigate()
  const [seeMore, setSeeMore] = useState(false);
  const [seeMoreT, setSeeMoreT] = useState(false);
  const [currentInd, setCurrentInd] = useState(null);
  const [currentIndT, setCurrentIndT] = useState(null);
  const [openCertify, setOpenCertify] = useState(false);
  const [openTranslate, setOpenTranslate] = useState(false);
  const [certificationStatus, setCertificationStatus] = useState("");
  const [translationStatus, setTranslationStatus] = useState("");
  const [idDoc, setIdDoc] = useState(null);
  const [translateDocumentT, { isLoading: isloadingT }] =
    useTranslateDocumentTMutation();
  const [certifyDocumentT, { isLoading: isLoadingC }] =
    useCertifyDocumentTMutation();

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

  const handlCertify = (id) => {
    if (id) {
      setIdDoc(id);
      setOpenCertify(true);
    } else {
      toast.error("document id needed !");
    }
  };

  const handlTranslate = (id) => {
    if (id) {
      setIdDoc(id);
      setOpenTranslate(true);
    } else {
      toast.error("document id needed !");
    }
  };

  const handleSubmitCertify = async () => {
    if (certificationStatus === "") {
      toast.error("Please select one of the option !");
    }
    console.log("certify", `id: ${idDoc}\n statusC: ${certificationStatus}`);
    await certifyDocumentT({
      documentId: idDoc,
      certificationStatus: certificationStatus,
    })
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        setOpenCertify(false);
        setCertificationStatus("");
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
  };

  const handleSubmitTranslate = async () => {
    if (translationStatus === "") {
      return toast.error("Please select one of the option !");
    }
    console.log("translate", `id: ${idDoc}\n statusT: ${translationStatus}`);
    console.log("t", translationStatus);

    await translateDocumentT({
      id: idDoc,
      data: translationStatus,
    })
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        setOpenTranslate(false);
        setTranslationStatus("");
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
  };

  return (
    // {/* Documents List */}
    <>
      <div className="space-y-8">
        {currentDocuments.map((doc, index) => (
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

            {/* two button of certify and translate */}
            <div className="flex gap-2 p-6 pt-2">
              {doc.certificationStatus === "pending" && (
                <button
                  onClick={() => handlCertify(doc._id)}
                  className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Certify
                </button>
              )}
              {doc.status === "pending" && (
                <button
                  disabled={
                    doc.certificationStatus === "rejected" ? true : false
                  }
                  onClick={() => handlTranslate(doc._id)}
                  className={`px-4 py-1 bg-blue-500 ${doc.certificationStatus === "rejected" ? 'opacity-20' : ' opacity-100 '} text-white rounded hover:bg-blue-600 transition-colors`}
                >
                  Translate
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* modal with select status of certification */}
      {openCertify === true && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-30 flex items-center justify-center z-50">
          <div
            className="bg-white flex m-4 flex-col justify-between rounded-lg shadow-lg p-6 
                  h-2/4 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 max-h-[80vh] overflow-y-auto"
          >
            <div>
              <h2 className="text-lg font-medium mb-4">Certify Document</h2>
              <select
                value={certificationStatus}
                onChange={(e) => setCertificationStatus(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              >
                <option value="">Select Status</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <button
                disabled={isLoadingC}
                onClick={handleSubmitCertify}
                className="px-4 py-2 w-full bg-themeColor text-white rounded hover:bg-gray-600 transition-colors"
              >
                {isLoadingC ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => setOpenCertify(false)}
                className="px-4 py-2 w-1/3 bg-themeColor text-white rounded hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* modal of translation */}
      {openTranslate === true && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-30 flex items-center justify-center z-50">
          <div
            className="bg-white flex m-4 flex-col justify-between rounded-lg shadow-lg p-6 
                  h-2/4 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 max-h-[80vh] overflow-y-auto"
          >
            <div>
              <h2 className="text-lg font-medium mb-4">Translate Document</h2>
              <select
                value={translationStatus}
                onChange={(e) => setTranslationStatus(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              >
                <option value="">Select Status</option>
                <option value="translated">Translated</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <button
                disabled={isloadingT}
                onClick={handleSubmitTranslate}
                className="px-4 py-2 w-full bg-themeColor text-white rounded hover:bg-gray-600 transition-colors"
              >
                {isloadingT ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => setOpenTranslate(false)}
                className="px-4 py-2 w-1/3 bg-themeColor text-white rounded hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DocumentCard;
