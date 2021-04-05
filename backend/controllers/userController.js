import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

// @desc    Auth user and get token
// @route   POST api/users/login
// @acces   Public
const authUser = asyncHandler(async (req, res) => {
  // requesting the data, which the user sends
  const { email, password } = req.body;

  res.send({ email, password });
});

export { authUser };
