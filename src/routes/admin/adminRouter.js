import exppress from 'express';
const adminRouter = exppress.Router();

import { testAdmin } from '../../controllers/admin/admin.js';

adminRouter.route('/test').get(testAdmin);

export default adminRouter;
