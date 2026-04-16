import BadRequestError from '../BadRequestError';

export default class ChatInvalidRequestError extends BadRequestError {
  constructor(message = 'Invalid chat request') {
    super(message);
  }
}
