import express from "express";
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
} from "../controllers/productController.js";
import { auth, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// router.get('/', getProducts);
/*
  router.methods() -> routing functionality, where METHOD
  is one of the HTTP methods (get,put, post)
*/

/*
  router.route instance of single route to handle HTTP methods
  & avoiding duplicate route naming
*/
router.route("/").get(getProducts).post(auth, isAdmin, createProduct);
router
  .route("/:id")
  .get(getProductById)
  .delete(auth, isAdmin, deleteProduct)
  .put(auth, isAdmin, updateProduct);

export default router;
