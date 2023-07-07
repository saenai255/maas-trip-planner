import { Coordinates } from '../dto/coordinates';
import TripPlannerResponse from './dto/trip-planner-response';
import log from '../logger';
import { getTripPlanner } from './get-trip-planner';

async function fetchPlan(from: Coordinates, to: Coordinates): Promise<TripPlannerResponse> {
    try {
        log.debug('Fetching routes based on given coordinates.', {
            from,
            to,
        });

        const result = await getTripPlanner(from, to);

        log.info('Successfully fetched routes based on given coordinates.', {
            from,
            to,
        });

        return result;
    } catch (e) {
        log.error('Failed to fetch routes', { message: e?.message, stack: e?.stack });
        throw new Error('Failed to fetch routes');
    }
}

const api = {
    tripPlanner: {
        get: fetchPlan,
    },
} as const;

export default api;
