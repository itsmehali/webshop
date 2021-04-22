import express from 'express';
import { newOrderItems } from '../controllers/orderController.js';
import { auth } from '../middleware/authMiddleware.js';

const router = express.Router();

// routes
router.route('/').post(auth, newOrderItems);

export default router;
