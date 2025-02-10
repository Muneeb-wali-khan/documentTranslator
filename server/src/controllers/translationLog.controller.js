import { TranslationLogModel } from "../models/TranslationLog";

const getTranslationLogs = async (req, res) => {
  try {
    const logs = await TranslationLogModel.find({}).populate("userId documentId");
    res.status(200).json({ logs });
  } catch (error) {
    res.status(500).json({ error: "Error fetching translation logs" });
  }
};