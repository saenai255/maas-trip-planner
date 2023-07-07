import { APIGatewayEvent } from 'aws-lambda';
import { Coordinates } from './coordinates';
import BadRequestError from '../errors/bad-request';

type Request = {
    from: Coordinates;
    to: Coordinates;
};

function parseRequest(event: APIGatewayEvent): Request {
    const from = event.queryStringParameters?.from;
    const to = event.queryStringParameters?.to;

    if (!from || !to) {
        throw new BadRequestError('Missing required query parameters.', {
            from,
            to,
        });
    }

    const fromCoordinates = from.split(',').map((coordinate) => parseFloat(coordinate));
    const toCoordinates = to.split(',').map((coordinate) => parseFloat(coordinate));

    const coordsAreValidNumbers = [...fromCoordinates, ...toCoordinates].every(
        (coordinate) => !isNaN(coordinate) && typeof coordinate === 'number',
    );
    if (fromCoordinates.length !== 2 || toCoordinates.length !== 2 || !coordsAreValidNumbers) {
        throw new BadRequestError('Invalid query parameters.', {
            from,
            to,
        });
    }

    return {
        from: fromCoordinates as Coordinates,
        to: toCoordinates as Coordinates,
    };
}

export { parseRequest };

export default Request;
