import colors from 'colors';
import ErrorResponse from '../utils/errorResponse.js';

const errorHandler = (err, req, res, next) => {
  let message;
  let error = { ...err };

  error.message = err.message;

  // Log To Console For Developer
  if (process.env.NODE_ENV === 'development') {
    console.log(colors.red(error));
  }

  //   Mongoose bad ObejctID
  if (err.name === 'CastError') {
    message = `Resource not found ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  //   Mongoose Duplicat Key
  if (err.code === 11000) {
    console.log('11000', err.message);
    message = `Duplicate filed entered`;
    error = new ErrorResponse(message, 422);
  }

  //   Mongoose Validation Error ValidationError
  if (err.name === 'ValidationError') {
    message = Object.values(err.errors).map(
      (val) => `${val.message} "${val?.value}"`
    );
    error = new ErrorResponse(message, 422);
  }

  return res.status(error.statusCode || 500).json({
    sucess: false,
    code: error.statusCode || 500,
    message: error.message || 'Something Went Wrong',
    stack: process.env.NODE_ENV === 'production' ? undefined : error.stack,
  });
};

export default errorHandler;
