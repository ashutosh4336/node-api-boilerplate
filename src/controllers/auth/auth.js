// @ts-nocheck
import mongoose from 'mongoose';
import asyncHandler from '../../middlewares/async.js';
import ErrorResponse from '../../utils/errorResponse.js';

import {
  writeLogDebug,
  writeLogError,
  writeLogInfo,
  writeLogSilly,
  writeLogWarn,
} from '../../helpers/writeLog.js';

// Import model
import Role from '../../models/static/Role.js';
import User from '../../models/user/User.js';

// import Validations Schemas
import {
  signupUserSchema,
  updateUserSchema,
  loginUserSchema,
} from '../../validations/authValidation.js';

/**
 *
 * @desc        Test Auth Route
 * @route       GET /api/v1/auth
 * @access      Public
 */
const testAuth = asyncHandler(async (req, res, next) => {
  return res.status(200).json({ msg: 'Auth Works' });
});

/**
 *
 * @desc        Register User
 * @route       POST /api/v1/auth/register
 * @access      Public
 */
const signupUser = asyncHandler(async (req, res, next) => {
  const role = await Role.find({});
  let message = '';

  const { error, value } = signupUserSchema.validate(req.body, {
    abortEarly: false,
  });

  if (!!error) {
    error?.details.forEach((a, b) => {
      message =
        (message && `${message.replace(/phone/g, 'Contact Number')},`) +
        (a.message.replace(/\"/g, '') + '.');
    });

    writeLogError(
      req.clientIP,
      req.reqUrlPath,
      'Failed signup attempt with',
      req.body.email,
      message
    );
    return next(new ErrorResponse(message, 422));
  }

  if (value?.userRole && value?.userRole.toUpperCase() === 'ADMIN') {
    message = "Admin can't be Created";
    writeLogError(req.clientIP, req.reqUrlPath, req?.body?.email, message);
    return next(new ErrorResponse(message, 422));
  }

  const extractUserRole = role.find(
    (el) => el.value === value.userRole.toLowerCase()
  );

  if (!extractUserRole) {
    message = 'Invalid User Type...';
    writeLogError(req.clientIP, req.reqUrlPath, req?.body?.email, message);
    return next(new ErrorResponse(message, 422));
  }

  const user = {
    firstName: value.firstName,
    lastName: value.lastName,
    userName: value.userName,
    email: value.email,
    password: value.password,
    phone: value.phone,
    userRole: mongoose.Types.ObjectId(extractUserRole?._id),
  };

  const createdUser = await User.create(user);

  const toBeSentUser = {
    _id: createdUser?._id,
    firstName: createdUser?.firstName,
    lastName: createdUser?.lastName,
    userName: createdUser?.userName,
    email: createdUser?.email,
    userRole: extractUserRole?.value,
    token: createdUser.getSignedJwtToken(),
  };

  message = 'Successful signup attempt with';
  writeLogInfo(req.clientIP, req.reqUrlPath, toBeSentUser?.email, message);

  return res
    .status(201)
    .json({ message: 'Signup successfull', code: 201, data: toBeSentUser });
});

/**
 *
 * @desc        Login User
 * @route       POST /api/v1/auth/login
 * @access      Public
 */

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  let message = '';

  if (!email || !password) {
    return res
      .status(400)
      .json({ code: 400, msg: 'Provide the Required Fields' });
  }

  const { error, value } = loginUserSchema.validate(req.body, {
    abortEarly: false,
  });
  if (!!error) {
    error?.details.forEach((a, b) => {
      message =
        (message && `${message},`) + (a.message.replace(/\"/g, '') + '.');
    });

    writeLogError(
      req.clientIP,
      req.reqUrlPath,
      'Login attempt Unsuccessfull',
      email,
      message
    );
    return next(new ErrorResponse(message, 422));
  }

  // check for user
  const user = await User.findOne({ email })
    .populate('userRole', 'value')
    .select('+password');

  if (!user) {
    message = 'No User Found with Email';

    writeLogError(
      req.clientIP,
      req.reqUrlPath,
      'Login attempt Unsuccessfull',
      email,
      message
    );
    return next(new ErrorResponse(`No User Found with Email`, 404));
  }

  //   check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    message = `Invalid Credential`;
    writeLogError(
      req.clientIP,
      req.reqUrlPath,
      'Login attempt Unsuccessfull',
      email,
      message
    );
    return next(new ErrorResponse(message, 404));
  }

  writeLogInfo(req.clientIP, req.reqUrlPath, 'Login Successfull', email);

  // Create Token
  const token = user.getSignedJwtToken();
  const toBeSentUser = {
    id: user._id,
    role: user.userRole,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    token,
  };
  return res.status(200).json({
    code: 200,
    data: toBeSentUser,
  });
  // sendTokenResponse(user, 200, res);
});

export { testAuth, loginUser, signupUser };
