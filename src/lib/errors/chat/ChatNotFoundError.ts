import NotFoundError from '../NotFoundError';

export default class ChatNotFoundError extends NotFoundError {
  constructor() {
    super('Chat not found');
  }
}
