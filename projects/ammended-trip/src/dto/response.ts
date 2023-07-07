import { Coordinates } from './coordinates';

type Location = {
    coordinates: Coordinates;
};

type Leg = {
    mode: string;
    routeShortName?: string;
    distance: number;
    co2: number;
};

/** ISO Date */
type ISODateString = string;

type Itinerary = {
    co2: number;
    distance: number;
    startTime: ISODateString;
    endTime: ISODateString;
    duration: number;
    legs: Leg[];
};

type Plan = {
    from: Location;
    to: Location;
    itineraries: Itinerary[];
};

type Response = {
    plan: Plan;
};

export default Response;
export { Location, Leg, Itinerary, Plan };
