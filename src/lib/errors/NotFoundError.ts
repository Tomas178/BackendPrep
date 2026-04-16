import { StatusCodes } from 'http-status-codes';
import ApiError from './ApiError';

export default class NotFoundError extends ApiError {
  constructor(message = 'Not found') {
    super(message, StatusCodes.NOT_FOUND);
  }
}
