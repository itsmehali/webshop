import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Halasz Balazs',
    email: 'halaszbalazs98@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Kiss Edit',
    email: 'kissedit@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
