import express from "express";
import {
  authUser,
  getProfile,
  registerUser,
  getUsers,
} from "../controllers/userController.js";
import { auth, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// routes
router.route("/login").post(authUser);
router.route("/profile").get(auth, getProfile);
router.route("/").post(registerUser).get(auth, isAdmin, getUsers);

export default router;
