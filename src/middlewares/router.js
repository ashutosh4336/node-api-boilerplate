// @ts-nocheck
import adminRouter from '../routes/admin/adminRouter.js';
import authRouter from '../routes/auth/authRouter.js';
import userRouter from '../routes/user/userRouter.js';
import miscellaneousRouter from '../routes/miscellaneous/miscellaneousRoute.js';

const routeLoader = (app) => {
  app.use('/api/v1/admin', adminRouter);
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/user', userRouter);
  app.use('/api/v1/miscellaneous', miscellaneousRouter);
};

export default routeLoader;
