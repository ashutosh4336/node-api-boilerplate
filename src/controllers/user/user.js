import asyncHandler from '../../middlewares/async.js';
import ErrorResponse from '../../utils/errorResponse.js';

/**
 *
 * @desc        Test User Route
 * @route       GET /api/v1/user
 * @access      Public
 */
const testUser = asyncHandler(async (req, res, next) => {
  return res.status(200).json({ msg: 'Users Works' });
});

export { testUser };
