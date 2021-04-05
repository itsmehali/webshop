import express from 'express';
import {
  getProducts,
  getProductById,
} from '../controllers/productController.js';
import asyncHandler from 'express-async-handler';

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
router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

export default router;
