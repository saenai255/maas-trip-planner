import { TransportationMode, calculateCO2Emissions } from './co2-multipliers';
import Response from './dto/response';
import { Coordinates } from './dto/coordinates';
import TripPlannerResponse from './otp/dto/trip-planner-response';
import api from './otp/api';
import { Message } from './otp/dto/planner-error';
import BadRequestError from './errors/bad-request';

async function run(from: Coordinates, to: Coordinates): Promise<Response> {
    const result = await api.tripPlanner.get(from, to);
    if (result.error && result.error.message !== Message.PlanOk) {
        throw new BadRequestError(result.error.msg, {
            message: result.error.message,
            id: result.error.id,
        });
    }

    return mapToResponse(result);
}

function mapToResponse(result: TripPlannerResponse): Response {
    const formatNumberToTwoDecimals = (number: number) => Math.round(number * 100) / 100;

    const output: Response = {
        plan: {
            from: {
                coordinates: [result.plan.from.lon, result.plan.from.lat],
            },
            to: {
                coordinates: [result.plan.to.lon, result.plan.to.lat],
            },
            itineraries: result.plan.itineraries.map((itinerary) => ({
                distance: itinerary.legs.reduce((acc, leg) => acc + leg.distance, 0),
                duration: itinerary.duration,
                startTime: new Date(itinerary.startTime).toISOString(),
                endTime: new Date(itinerary.endTime).toISOString(),
                co2: -1, // Will be calculated later.
                legs: itinerary.legs.map((leg) => ({
                    mode: leg.mode,
                    routeShortName: leg.routeShortName,
                    distance: leg.distance,
                    co2: formatNumberToTwoDecimals(calculateCO2Emissions(leg.distance, leg.mode as TransportationMode)),
                })),
            })),
        },
    };

    // Calculate total CO2 emissions for each itinerary.
    for (const itinerary of output.plan.itineraries) {
        itinerary.co2 = itinerary.legs.reduce((acc, leg) => acc + leg.co2, 0);
    }
    return output;
}

export default run;
export { mapToResponse };
