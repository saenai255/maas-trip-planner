import { Handler, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import log from './logger';
import run from './service';
import BaseError from './errors/base';
import { parseRequest } from './dto/request';

export const handler: Handler<APIGatewayEvent, APIGatewayProxyResult> = async (event) => {
    log.info('Executing lambda function', {
        body: event.body,
        headers: event.headers,
        pathParameters: event.pathParameters,
        queryStringParameters: event.queryStringParameters,
    });

    try {
        const data = parseRequest(event);

        const result = await run(data.from, data.to);
        log.info('Successfully executed lambda function');

        return {
            statusCode: 200,
            body: JSON.stringify(result),
        };
    } catch (error) {
        // If the error is not an instance of BaseError, it means that it is an unexpected error.
        if (!(error instanceof BaseError)) {
            log.error('Unexpected error', { message: error?.message, stack: error?.stack });
            return {
                statusCode: 500,
                body: JSON.stringify({
                    message: 'Internal server error',
                }),
            };
        }

        // If the error is an instance of BaseError, it means that it is an expected error.
        log.error(error.message, {
            statusCode: error.statusCode,
            details: error.details,
        });

        return {
            statusCode: error.statusCode,
            body: JSON.stringify({
                message: error.message,
                details: error.details,
            }),
        };
    }
};
