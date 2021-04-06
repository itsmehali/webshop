import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import jwtToken from '../others/jwtToken.js';

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
    throw new Error('The email or password does not match');
  }
});

export { authUser };
