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
  let finalElArr = [];
  let { ip } = req.body;
  ip = ip.split(',');

  ip.forEach((element) => {
    finalElArr.push({ ip: element });
  });

  const resFromDb = await BlackListIp.insertMany(finalElArr);

  writeLogInfo(
    req.clientIP,
    req.reqUrlPath,
    JSON.stringify(ip, null, 2),
    'IP Blocked'
  );
  return res.status(200).json({ msg: 'IP Blocked', resFromDb });
});

export { blockUser };
