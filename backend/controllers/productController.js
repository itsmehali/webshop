import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";

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
    : res.status(404).json({ message: "Product not found" });
});

// @desc    Create prodcut
// @route   POST api/products
// @acces   Private -- Only ADMIN
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "New Product",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Brand",
    category: "Category",
    countInStock: 0,
    description: "Description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a  prodcut
// @route   PUT api/products/:id
// @acces   Private -- Only ADMIN
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, countInStock, image, brand, description, category } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.countInStock = countInStock;
    product.image = image;
    product.brand = brand;
    product.category = category;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Delete prodcut
// @route   DELETE api/products/:id
// @acces   Private -- Only ADMIN
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  // if product exists
  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
