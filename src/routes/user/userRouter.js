import express from 'express';
const userRouter = express.Router();

import { testUser } from '../../controllers/user/user.js';

userRouter.route('/test').get(testUser);

export default userRouter;
