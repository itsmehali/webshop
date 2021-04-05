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

// @desc    Get product by ID
// @route   GET api/products/:id
// @acces   Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  })
);

export default router;
