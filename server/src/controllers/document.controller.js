import fs from "fs";
import { DocumentModel } from "../models/Document.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Translate from "google-translate-api-x";
import { UserModel } from "../models/User.js";
import { TranslationLogModel } from "../models/TranslationLog.js";
import { extractTextWithOCRSpace } from "../utils/imageExtractor.js";
import { extractTextFromDoc } from "../utils/docExtractor.js";
import { pdfExtraction } from "../utils/pdfExtractor.js";
import { asyncHandler } from "../utils/asyncHandler.js";
// const outputPath = "./public/temp/text.txt";

const uploadDocument = asyncHandler(async (req, res) => {
  const { targetLanguage, sourceLanguage } = req.body;
  const file = req?.file;
  const userId = req?.user?._id;

  if (!file) {
    throw new ApiError(400, "File is required");
  }

  let text = "";

  // Extract text based on file type
  switch (file?.mimetype) {
    case "application/pdf":
      text = await pdfExtraction(file?.path).catch((err) => {
        throw new ApiError(400, "Error extracting text from PDF");
      });
      break;

    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      const docxText = await extractTextFromDoc(file?.path);
      text = docxText;
      break;

    case file?.mimetype?.startsWith("image/") && file?.mimetype:
      await extractTextWithOCRSpace(file?.path).then((res) => {
        if (res?.ParsedResults?.[0]?.ParsedText) {
          text = res.ParsedResults[0].ParsedText;
        } else {
          throw new ApiError(400, res?.ErrorMessage?.[0]);
        }
      });
      break;

    default:
      fs.unlinkSync(file.path);
      throw new ApiError(400, "unsupported file type !");
  }

  // Save document in the database
  const document = await DocumentModel.create({
    userId: userId,
    originalFileName: file.originalname,
    originalText: text,
    sourceLanguage: sourceLanguage,
    targetLanguage: targetLanguage,
  });

  // console.log("content", text);
  fs.unlinkSync(file.path);
  return res
    .status(201)
    .json(new ApiResponse(201, document, "Document uploaded successfully"));
});

// --translator
const allDocuments = asyncHandler(async (req, res) => {
  const documents = await DocumentModel.find()
    .populate("userId", "username email")
    .sort({ createdAt: -1 });
  if (!documents) throw new ApiError(404, "Documents not found");
  return res
    .status(200)
    .json(new ApiResponse(200, documents, "Documents fetched successfully"));
});

// --admin
const allDocumentsAdmin = asyncHandler(async (req, res) => {
  const documents = await DocumentModel.find()
    .populate("userId", "username email")
    .sort({ createdAt: -1 });
  if (!documents) throw new ApiError(404, "Documents not found");
  return res
    .status(200)
    .json(new ApiResponse(200, documents, "Documents fetched successfully"));
});

// user
const specificUserDocuments = asyncHandler(async (req, res) => {
  const userId = req?.user?._id;
  const documents = await DocumentModel.find({ userId: userId })
  if (!documents) throw new ApiError(404, "Documents not found");
  return res
    .status(200)
    .json(new ApiResponse(200, documents, "Documents fetched successfully"));
});

const translateDocument = asyncHandler(async (req, res) => {
  const {status} = req.body
  const id = req.params.id;

  // console.log(status, id);
  
  const userId = req.user?._id;
  if (!id) {
    throw new ApiError(400, "Document ID is required");
  }
  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }
  const document = await DocumentModel.findById(id);
  if (!document) throw new ApiError(404, "Document not found");

  const textToTranslate = document?.originalText;
  if (!textToTranslate) throw new ApiError(404, "Text not found");

  if (document?.status === "translated") {
    throw new ApiError(400, "Document already translated");
  }

  const result = await Translate(textToTranslate, {
    from: document?.sourceLanguage || "auto",
    to: document?.targetLanguage,
    autoCorrect: true,
  });

  if (result?.text) {
    document.translatedText = result.text;
    document.status = status;
    await document.save();
  }

  // Log the translation action
  const translationLog = await TranslationLogModel.create({
    userId: userId,
    documentId: document?._id,
    action: "translate",
    sourceLanguage: document?.sourceLanguage,
    targetLanguage: document?.targetLanguage,
  });
  await translationLog.save();
  // console.log(result?.from?.language?.iso);
  return res
    .status(200)
    .json(new ApiResponse(200, document, "Document translated successfully"));
});

const certifyDocument = asyncHandler(async (req, res) => {
  const { documentId, certificationStatus } = req.body;
  const translatorId = req?.user?._id;
// console.log(req.body);

  if (!documentId || !translatorId) {
    throw new ApiError(400, "Document ID and translator ID are required");
  }

  const document = await DocumentModel.findById(documentId);
  if (!document) throw new ApiError(404, "Document not found");

  // check if the docment is already certified
  if (document?.certificationStatus === "approved" || document?.certificationStatus === "rejected") {
    throw new ApiError(400, "Document already certified");
  }

  // certify document
  document.certifiedBy = translatorId;
  document.certificationStatus = certificationStatus;
  await document.save();

  return res
    .status(200)
    .json(new ApiResponse(200, document, "Document certified successfully"));
});

export { uploadDocument, translateDocument, allDocuments, certifyDocument,specificUserDocuments,allDocumentsAdmin };
