import { StatusCodes } from 'http-status-codes';
import ApiError from './ApiError';

export default class UnauthorizedError extends ApiError {
  constructor() {
    super('Unauthorized', StatusCodes.UNAUTHORIZED);
  }
}
