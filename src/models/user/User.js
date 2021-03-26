// @ts-nocheck
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'users';

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, 'Please Provide Your First name'],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, 'Please Provide Your Last name'],
    },
    userName: {
      type: String,
      trim: true,
      required: [true, 'Please Provide an Username'],
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, 'Please add a email'],
      unique: true,
      trim: true,
      index: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    userRole: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
      required: true,
    },
    password: {
      type: String,
      required: [true, 'Please Provide Password'],
      minlength: 8,
      select: false,
      trim: true,
    },

    avatar: {
      type: String,
      default: 'uploads/no-photo.png',
    },

    isDeleted: {
      type: Boolean,
      enum: [false, true],
      default: false,
    },

    confirmEmailToken: String,
    confirmEmailTokenExpire: String,

    varified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: COLLECTION_NAME,
  }
);

// Hash Password using bryptjs
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    {
      id: this._id,
      userRole: this.userRole,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

// Match User Entered password to hashed password in DB
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model(DOCUMENT_NAME, UserSchema);
export default User;
