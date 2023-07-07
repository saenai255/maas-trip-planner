import { APIGatewayEvent } from 'aws-lambda';
import { parseRequest } from './request';

describe('Request', () => {
    describe('parseRequest', () => {
        it('should parse the request', () => {
            const event: APIGatewayEvent = {
                queryStringParameters: {
                    from: '60.1699,24.9384',
                    to: '60.1699,24.9384',
                },
            } as any;

            const result = parseRequest(event);
            expect(result).toEqual({
                from: [60.1699, 24.9384],
                to: [60.1699, 24.9384],
            });
        });

        it('should throw when given too few coordinates', () => {
            const event: APIGatewayEvent = {
                queryStringParameters: {
                    from: '60.1699',
                    to: '60.1699,24.9384',
                },
            } as any;

            expect(() => parseRequest(event)).toThrowErrorMatchingSnapshot();
        });

        it('should throw when given too many coordinates', () => {
            const event: APIGatewayEvent = {
                queryStringParameters: {
                    from: '60.1699,123,321',
                    to: '60.1699,24.9384',
                },
            } as any;

            expect(() => parseRequest(event)).toThrowErrorMatchingSnapshot();
        });

        it('should throw when given invalid coordinates', () => {
            const event: APIGatewayEvent = {
                queryStringParameters: {
                    from: 'X,24.9384',
                    to: '60.1699,24.9384',
                },
            } as any;

            expect(() => parseRequest(event)).toThrowErrorMatchingSnapshot();
        });
    });
});
