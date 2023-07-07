import { Alert } from './alert';
import { EncodedPolylineBean } from './encoded-polyline-bean';
import { Place } from './place';
import { WalkStep } from './walk-step';

export type Leg = {
    startTime: number;
    endTime: number;
    departureDelay: number;
    arrivalDelay: number;
    realTime: boolean;
    isNonExactFrequency: boolean;
    headway: number;
    /** Distance in meters. */
    distance: number;
    pathway: boolean;
    mode: string;
    transitLeg: boolean;
    route: string;
    agencyName: string;
    agencyUrl: string;
    agencyBrandingUrl: string;
    agencyTimeZoneOffset: number;
    routeColor: string;
    routeType: number;
    routeId: string;
    routeTextColor: string;
    interlineWithPreviousLeg: boolean;
    tripShortName: string;
    tripBlockId: string;
    headsign: string;
    agencyId: string;
    tripId: string;
    serviceDate: string;
    routeBrandingUrl: string;
    from: Place;
    to: Place;
    intermediateStops: Place[];
    legGeometry: EncodedPolylineBean;
    steps: WalkStep[];
    alerts: Alert[];
    routeShortName: string;
    routeLongName: string;
    boardRule: string;
    alightRule: string;
    rentedBike: boolean;
    duration: number;
};