import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Only want the token, we dont want the "Bearer"
      token = req.headers.authorization.split(' ')[1];
      // getting back the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log(decoded);

      next();
    } catch (err) {}
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorizedn, no token');
  }
});

export { protect };
