// @ts-nocheck
import adminRouter from '../routes/admin/adminRouter.js';
import authRouter from '../routes/auth/authRouter.js';
import userRouter from '../routes/user/userRouter.js';

const routeLoader = (app) => {
  app.use('/api/v1/admin', adminRouter);
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/user', userRouter);
};

export default routeLoader;
