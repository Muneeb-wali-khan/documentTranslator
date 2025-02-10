import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  originalFileName: { type: String, required: true },
  originalText: { type: String, required: true },
  translatedText: { type: String },
  sourceLanguage: { type: String, required: true },
  targetLanguage: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "translated", "failed"],
    default: "pending",
  },
  certifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  certificationStatus: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

export const DocumentModel = mongoose.model("Document", documentSchema);
