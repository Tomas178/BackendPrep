import { StatusCodes } from 'http-status-codes';
import ApiError from './ApiError';

export default class BadRequestError extends ApiError {
  constructor(message = 'Bad request') {
    super(message, StatusCodes.BAD_REQUEST);
  }
}
