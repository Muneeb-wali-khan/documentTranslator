import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema({
  translatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  certifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

export const CertificationModel = mongoose.model(
  "Certification",
  certificationSchema
);
