import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/* Method defined here, to use for checking if the user has
given the correct password */
userSchema.methods.isPasswordMatch = async function (theGivenPassword) {
  return await bcrypt.compare(theGivenPassword, this.password);
};

// salting and making sure the password is hashed
userSchema.pre('save', async function (next) {
  // using mongoose if its not modified
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
