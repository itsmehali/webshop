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
      {
        /*  assigning token
        dont want the Bearer so we split is
       and Bearer is the 0 index and the token is the 1 index
      */
      }
      token = req.headers.authorization.split(' ')[1];
      // decode token, verify token, then passing our secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // put in req.user all of the rest data except the password
      req.user = await (await User.findById(decoded.id)).isSelected(
        '-password'
      );

      next();
    } catch (err) {}
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorizedn, no token');
  }
});

export { protect };
