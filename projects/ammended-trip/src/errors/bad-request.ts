import BaseError from './base';

class BadRequestError extends BaseError {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(message: string, details: Record<string, any> = {}) {
        super(message);
        this.statusCode = 400;
        this.details = details;
    }
}

export default BadRequestError;
