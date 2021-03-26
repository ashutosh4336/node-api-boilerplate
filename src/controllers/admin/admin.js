import asyncHandler from '../../middlewares/async.js';
import ErrorResponse from '../../utils/errorResponse.js';
import {
  writeLogDebug,
  writeLogError,
  writeLogInfo,
  writeLogSilly,
  writeLogWarn,
} from '../../helpers/writeLog.js';

/**
 *
 * @desc        Test Admin Route
 * @route       GET /api/v1/admin
 * @access      Public
 */
const testAdmin = asyncHandler(async (req, res, next) => {
  writeLogInfo(req.clientIP, req.reqUrlPath, 'Test Admin Route');
  return res.status(200).json({ msg: 'Admin Works' });
});

export { testAdmin };
