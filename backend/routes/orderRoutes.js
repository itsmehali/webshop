import express from "express";
import { newOrderItems, getAllOrders } from "../controllers/orderController.js";
import { auth, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// routes
router.route("/").post(auth, newOrderItems).get(auth, isAdmin, getAllOrders);

export default router;
