import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import jwtToken from "../others/jwtToken.js";

// @desc    Auth user and get token
// @route   POST api/users/login
// @acces   Public
const authUser = asyncHandler(async (req, res) => {
  // requesting the data, which the user sends
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  //checking if user exists AND if the password is matching
  // isPasswordMatch() function from User model
  if (user && (await user.isPasswordMatch(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: jwtToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("The email or password does not match");
  }
});

// @desc    Register user
// @route   POST api/users
// @acces   Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  const userIsAlreadyTaken = await User.findOne({ email });

  // checking if the user already exists
  if (userIsAlreadyTaken) {
    res.status(400);
    throw new Error("User already exists");
  }

  // creating the user
  const user = await User.create({
    name,
    email,
    password,
  });

  // succes, sending data back
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: jwtToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Get all users
// @route   GET api/users
// @acces   Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Get profile
// @route   GET api/users/profile
// @acces   Private
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { authUser, getProfile, registerUser, getUsers };
