export class HttpError extends Error {
  status: number;
  data?: unknown;

  constructor(
    error:
      | string
      | {
          message?: string;
          data?: Record<string, unknown>;
        },
    status: number,
    data?: Record<string, unknown>,
  ) {
    const { message = 'Error' } =
      typeof error === 'string' ? { message: error } : error;
    super(message);
    this.status = status;
    this.data = typeof error === 'object' ? error.data : data;
  }
}
