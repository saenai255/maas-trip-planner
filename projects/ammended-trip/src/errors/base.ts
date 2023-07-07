abstract class BaseError extends Error {
    public statusCode = 500;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public details: Record<string, any> = {};

    constructor(message: string) {
        super(message);
    }
}

export default BaseError;
