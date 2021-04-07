import express from 'express';
import { authUser, getProfile } from '../controllers/userController.js';
import asyncHandler from 'express-async-handler';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/login').post(authUser);
router.route('/profile').get(protect, getProfile);

export default router;
