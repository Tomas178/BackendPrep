import BadRequestError from '../BadRequestError';

export default class ChatInappropriateMessageError extends BadRequestError {
  constructor() {
    super(
      'Your message was flagged as inappropriate. Please keep the conversation professional.'
    );
  }
}
