import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { FaArrowAltCircleLeft, FaUpload } from "react-icons/fa";
import { useState } from "react";
import { useUploadDocumentUMutation } from "../../../store/Features/documents.feature";
import BackButton from "../../../components/backButton/BackButton";

function UploadFile() {
  const [file, setFile] = useState("");
  const [uploadDocumentU, { isLoading }] = useUploadDocumentUMutation();

  const formik = useFormik({
    initialValues: {
      sourceLanguage: "",
      targetLanguage: "",
    },
    validationSchema: Yup.object({
      sourceLanguage: Yup.string().required("Source language is required"),
      targetLanguage: Yup.string().required("Target language is required"),
    }),
    onSubmit: async (values) => {
      if (!file) {
        return toast.error("Please select a file");
      }
      const formData = new FormData();
      formData.append("file", file);
      formData.append("sourceLanguage", values.sourceLanguage);
      formData.append("targetLanguage", values.targetLanguage);

      await uploadDocumentU(formData)
        .unwrap()
        .then((response) => {
          toast.success(response?.message);
          formik.resetForm();
          setFile("");
        })
        .catch((error) => {
          toast.error(error.data.message);
        });
    },
  });

  const uploadDocument = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/jpeg",
        "image/png",
        "image/jpg",
      ];

      if (validTypes.includes(file.type)) {
        setFile(file);
      } else {
        return toast.error(
          "Please select a valid file type (PDF, DOC, DOCX, or Image)"
        );
      }
    }
  };

  return (
    <>
      <BackButton/>
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-xl h-full mx-auto p-6 bg-themeColor rounded-xl shadow-lg space-y-6"
      >
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Source Language
          </label>
          <input
            type="text"
            name="sourceLanguage"
            onChange={formik.handleChange}
            value={formik.values.sourceLanguage}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-themeColor focus:border-transparent outline-none transition-all duration-200"
            placeholder="Enter document language"
          />
          {formik.touched.sourceLanguage && formik.errors.sourceLanguage && (
            <div className="text-red-500 text-sm">
              {formik.errors.sourceLanguage}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Target Language
          </label>
          <input
            type="text"
            name="targetLanguage"
            onChange={formik.handleChange}
            value={formik.values.targetLanguage}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-themeColor focus:border-transparent outline-none transition-all duration-200"
            placeholder="Enter translation language"
          />
          {formik.touched.targetLanguage && formik.errors.targetLanguage && (
            <div className="text-red-500 text-sm">
              {formik.errors.targetLanguage}
            </div>
          )}
        </div>

        <input
          type="file"
          id="fileUpload"
          accept=".doc,.docx,.pdf,image/*"
          onChange={uploadDocument}
          className="hidden"
        />
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Upload Document
          </label>
          <button
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("fileUpload").click();
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-2 focus:ring-themeColor focus:border-transparent outline-none transition-all duration-200"
          >
            Upload
            <FaUpload />
          </button>
        </div>

        <div className=" pt-12">
          <button
            disabled={isLoading}
            type="submit"
            className="w-full px-4 py-3 bg-white text-sm font-medium text-gray-900 rounded-lg hover:bg-opacity-90 disabled:opacity-50 transition-all duration-200 shadow-sm"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
}

export default UploadFile;
