import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';

/*
 I use asyncHandler so I dont need to use try / catch blocks
*/

// @desc    Get all products
// @route   GET api/products
// @acces   Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

// @desc    Get product by ID
// @route   GET api/products/:id
// @acces   Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  // if product exists
  product
    ? res.json(product)
    : res.status(404).json({ message: 'Product not found' });
});

export { getProducts, getProductById };
