import express from 'express';
const authRouoter = express.Router();

import { testAuth } from '../../controllers/auth/auth.js';

authRouoter.route('/test').get(testAuth);

export default authRouoter;
