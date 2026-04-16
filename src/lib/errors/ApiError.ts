export default class ApiError extends Error {
  public message: string;
  public status: number;
  public headers?: HeadersInit;

  constructor(message: string, status: number, headers?: HeadersInit) {
    super(message);

    this.message = message;
    this.status = status;
    this.headers = headers;
  }
}
