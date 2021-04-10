import express from 'express';
import {
  authUser,
  getProfile,
  registerUser,
} from '../controllers/userController.js';
import asyncHandler from 'express-async-handler';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// routes
router.route('/login').post(authUser);
router.route('/profile').get(protect, getProfile);
router.route('/').post(registerUser);

export default router;
