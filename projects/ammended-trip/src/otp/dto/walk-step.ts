import { AbsoluteDirection } from './absolute-direction';
import { Alert } from './alert';
import { RelativeDirection } from './relative-direction';

export type WalkStep = {
    distance: number;
    relativeDirection: RelativeDirection;
    streetName: string;
    absoluteDirection: AbsoluteDirection;
    exit: string;
    stayOn: boolean;
    area: boolean;
    bogusName: boolean;
    lon: number;
    lat: number;
    elevation: string;
    alerts: Alert[];
};
