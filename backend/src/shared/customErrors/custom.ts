export class BaseError extends Error {
  readonly statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class NotFoundError extends BaseError{
    constructor(message: string){
        super(message, 404)
    }
}

export class UnauthorizedError extends BaseError{
    constructor(message: string){
        super(message, 401)
    }
}
