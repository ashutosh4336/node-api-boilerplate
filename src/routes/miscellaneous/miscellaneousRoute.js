import express from 'express';
const miscellaneousRouter = express.Router();

import { blockUser } from '../../controllers/miscellaneous/miscellaneous.js';

miscellaneousRouter.route('/blockip').post(blockUser);

export default miscellaneousRouter;
