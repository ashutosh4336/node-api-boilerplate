import asyncHandler from '../../middlewares/async.js';
import ErrorResponse from '../../utils/errorResponse.js';

/**
 *
 * @desc        Test Auth Route
 * @route       GET /api/v1/auth
 * @access      Public
 */
const testAuth = asyncHandler(async (req, res, next) => {
  return res.status(200).json({ msg: 'Auth Works' });
});

export { testAuth };
