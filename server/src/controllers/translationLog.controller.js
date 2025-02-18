import { TranslationLogModel } from "../models/TranslationLog.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getTranslationLogs = asyncHandler(async(req, res) => {
  try {
    const logs = await TranslationLogModel.find({}).populate(
      "userId",
      "username email"
    ).populate(
      "documentId",
      "originalFileName originalText translatedText sourceLanguage targetLanguage status"
    ).sort({ createdAt: -1 });
    
    return res.status(200).json(
      new ApiResponse(200, logs, "Translation logs fetched successfully")
    )
  } catch (error) {
    throw new ApiError(500, error?.message)
  }
});

export {getTranslationLogs}