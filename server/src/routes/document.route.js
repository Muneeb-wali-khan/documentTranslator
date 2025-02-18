import express from "express";

const router = express.Router()
import { upload } from "../middlewares/multerMiddleware.js";
import { allDocuments, allDocumentsAdmin, certifyDocument, specificUserDocuments, translateDocument, uploadDocument } from "../controllers/document.controller.js";
import { authenticateUser, authorizeRole } from "../middlewares/authMiddleware.js";

// user
router.route("/upload-document").post(authenticateUser, authorizeRole("user"),upload.single("file"), uploadDocument);
router.route("/my-documents").get(authenticateUser,authorizeRole("user"), specificUserDocuments);

// translator
router.route("/all-documents").get(authenticateUser,authorizeRole("translator"),allDocuments);
router.route("/translate-document/:id").put(authenticateUser,authorizeRole("translator"),translateDocument);
router.route("/certify-document").put(authenticateUser,authorizeRole("translator"),certifyDocument);

// admin
router.route("/all-docs").get(authenticateUser,authorizeRole("admin"),allDocumentsAdmin);

export default router;