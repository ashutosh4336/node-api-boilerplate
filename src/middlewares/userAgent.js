const reqMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

/**
 *
 *  @author      ASHUTOSH PANDA @ashutosh4336
 *  @desc        Custom Midleware
 *               to Check If user Is using a Browser or Not (In Production)
 */
const userAgentCheck = (req, res, next) => {
  const userAgent = req.headers['user-agent'];
  const acceptUser = userAgent && userAgent.startsWith('Mozilla/');

  if (process.env.NODE_ENV === 'production' && !acceptUser) {
    return res.status(400).json({
      code: 400,
      message: 'WOOO-HOOOO... Stop Right There and Use a Browser',
    });
  }

  return next();
};

/**
 *
 * @author      ASHUTOSH PANDA @ashutosh4336
 * @desc        Custom Midleware
 *              to Check If user is making Request which are allowed or not
 */
const checkReqType = (req, res, next) => {
  if (reqMethods.includes(req.method.toUpperCase())) {
    return next();
  }

  return res.status(400).json({
    success: false,
    code: 400,
    message: 'WOOO-HOOOO... Stop Right There',
  });
};

export { userAgentCheck, checkReqType };
