import express from "express";
import { authenticateUser, authorizeRole } from "../middlewares/authMiddleware.js";
import { getTranslationLogs } from "../controllers/translationLog.controller.js";

const router = express.Router()


router.route("/translation-logs").get(authenticateUser, authorizeRole("admin"), getTranslationLogs);



export default router