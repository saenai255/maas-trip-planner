import { Itinerary } from './itinerary';
import { Place } from './place';

export type TripPlan = {
    date: number;
    itineraries: Itinerary[];
    from: Place;
    to: Place;
};
