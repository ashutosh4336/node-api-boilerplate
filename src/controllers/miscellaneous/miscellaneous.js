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
import BlackListIp from '../../models/user/BlackListIp.js';

/**
 *
 * @desc        Block IP
 * @route       POST /api/v1/miscellaneous/blockip
 * @access      Public
 */
const blockUser = asyncHandler(async (req, res, next) => {
  const { ip } = req.body;

  const resFromDb = await BlackListIp.create({ ip });
  console.log(resFromDb);

  writeLogInfo(req.clientIP, req.reqUrlPath, ip, 'IP Blocked');
  return res.status(200).json({ msg: 'Admin Works' });
});

export { blockUser };
