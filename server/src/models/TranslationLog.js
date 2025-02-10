import mongoose, { Schema, model } from "mongoose";

const translationLogSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  documentId: { type: Schema.Types.ObjectId, ref: "Document", required: true },
  action: { type: String, required: true },
  sourceLanguage: { type: String, required: true },
  targetLanguage: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export const TranslationLogModel = mongoose.model(
  "TranslationLog",
  translationLogSchema
);
