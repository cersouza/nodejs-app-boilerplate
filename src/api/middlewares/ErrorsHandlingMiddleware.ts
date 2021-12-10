import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import InvalidRequestError from '../../domain/exceptions/InvalidRequestError';
import RegisterNotFoundError from '../../domain/exceptions/RegisterNotFoundError';

const defineStatusCode = (error: Error) => {
  switch (error.name) {
    case RegisterNotFoundError.name:
      return StatusCodes.NOT_FOUND;
    case InvalidRequestError.name:
      return StatusCodes.BAD_REQUEST;
    default:
      return StatusCodes.INTERNAL_SERVER_ERROR;
  }
};

const ErrorsHandlingMiddleware: ErrorRequestHandler = (error, req, res, next) => {
  res.status(defineStatusCode(error)).json({
    message: error.message,
  });
};

export default ErrorsHandlingMiddleware;
