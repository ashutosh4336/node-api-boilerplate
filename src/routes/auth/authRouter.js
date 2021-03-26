import express from 'express';
const authRouoter = express.Router();

import {
  testAuth,
  loginUser,
  signupUser,
} from '../../controllers/auth/auth.js';

authRouoter.route('/test').get(testAuth);

authRouoter.route('/login').post(loginUser);
authRouoter.route('/register').post(signupUser);

export default authRouoter;
