import { Fare } from './fare';
import { Leg } from './leg';
import { SystemNotice } from './system-notice';

export type Itinerary = {
    duration: number;
    startTime: number;
    endTime: number;
    walkTime: number;
    transitTime: number;
    waitingTime: number;
    walkDistance: number;
    walkLimitExceeded: boolean;
    elevationLost: number;
    elevationGained: number;
    transfers: number;
    fare: Fare;
    legs: Leg[];
    systemNotices: SystemNotice[];
    tooSloped: boolean;
};
