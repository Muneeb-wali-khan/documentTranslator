import express from "express"
import { authenticateUser, authorizeRole } from "../middlewares/authMiddleware.js"
import { deleteUser, getAllUsers, getCurrentUser, updateUserPassword, updateUserProfile, updateUserRole } from "../controllers/user.controller.js"

const router = express.Router()

// admin
router.route("/all-users").get(authenticateUser, authorizeRole("admin"),getAllUsers)
router.route("/update-user-role/:id").put(authenticateUser, authorizeRole("admin"),updateUserRole)
router.route("/remove-user/:id").delete(authenticateUser, authorizeRole("admin"),deleteUser)

// user
router.route("/user-me").get(authenticateUser,getCurrentUser)
router.route("/update-profile").put(authenticateUser,updateUserProfile)
router.route("/update-password").put(authenticateUser,updateUserPassword)




export default router