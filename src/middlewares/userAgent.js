import requestIp from 'request-ip';
const reqMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
import BlackListIp from '../models/user/BlackListIp.js';
import ErrorResponse from '../utils/errorResponse.js';

import {
  writeLogDebug,
  writeLogError,
  writeLogInfo,
  writeLogSilly,
  writeLogWarn,
} from '../helpers/writeLog.js';

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
    writeLogWarn(req.clientIP, req.reqUrlPath, 'Browser not Used');
    return next(
      new ErrorResponse('WOOO-HOOOO... Stop Right There and Use a Browser', 400)
    );
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
  writeLogWarn(req.clientIP, req.reqUrlPath, "HTTP Method isn't allowed");
  return next(new ErrorResponse('WOOO-HOOOO... Stop Right There', 400));
};

const ipMiddleware = (req, res, next) => {
  let clientAddress = requestIp.getClientIp(req);
  if (clientAddress.substr(0, 7) == '::ffff:') {
    clientAddress = clientAddress.substr(7);
  }
  req.clientIP = clientAddress;
  next();
};

const reqRouteMw = (req, res, next) => {
  req.reqUrlPath = req.path;
  next();
};

const blockedUserMw = async (req, res, next) => {
  let ipArray = [];
  const ips = await BlackListIp.find({}, { ip: 1 }).lean();
  // @ts-ignore
  ipArray = ips.map((el) => el?.ip);

  if (ipArray.includes(req.clientIP)) {
    writeLogWarn(req.clientIP, req.reqUrlPath, 'IP Blocked');
    return next(
      new ErrorResponse(
        "You've been temporarily banned from accessing the resource",
        429
      )
    );
  }

  next();
};

export {
  userAgentCheck,
  checkReqType,
  ipMiddleware,
  reqRouteMw,
  blockedUserMw,
};
