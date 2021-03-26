import asyncHandler from '../../middlewares/async.js';
import ErrorResponse from '../../utils/errorResponse.js';

/**
 *
 * @desc        Test Admin Route
 * @route       GET /api/v1/admin
 * @access      Public
 */
const testAdmin = asyncHandler(async (req, res, next) => {
  return res.status(200).json({ msg: 'Admin Works' });
});

export { testAdmin };
