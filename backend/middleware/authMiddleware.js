import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';

/*
@auth: this method defines which route can be protected
*/

const auth = asyncHandler(async (req, res, next) => {
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
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (err) {
      console.error(err);
      res.status(401);
      throw new Error('Token has failed, could not authorized!');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export { auth };
