import express from 'express';
import asyncHandler from 'express-async-handler';
const router = express.Router();
import Product from '../models/Product.js';

/*
 I use asyncHandler so I dont need to use try / catch blocks
*/

// @desc    Get all products
// @route   GET api/products
// @acces   Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({});

    res.json(products);
  })
);

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
