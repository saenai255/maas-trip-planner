import Axios from 'axios';
import { Coordinates } from '../dto/coordinates';
import config from '../config';
import TripPlannerResponse from './dto/trip-planner-response';

async function getTripPlanner(from: Coordinates, to: Coordinates): Promise<TripPlannerResponse> {
    const now = new Date();
    const additionalParams: Record<string, string | number | boolean> = {
        time: now.getHours() + ':' + now.getMinutes(),
        date: now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear(),
        mode: 'TRANSIT',
        arriveBy: false,
        wheelchair: false,
        showIntermediateStops: true,
        locale: 'en',
    };

    const params = new URLSearchParams({
        fromPlace: from.join(','),
        toPlace: to.join(','),
        ...additionalParams,
    });

    const result = await Axios.get<TripPlannerResponse>(`${config.otp.url}/otp/routers/default/plan?${params.toString()}`, {
        headers: {
            'x-api-key': config.otp.apiKey,
        },
    });

    return result.data;
}

export { getTripPlanner };
