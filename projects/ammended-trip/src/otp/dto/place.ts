import { VertexType } from './vertex-type';

export type Place = {
    name: string;
    stopId: string;
    stopCode: string;
    platformCode: string;
    lon: number;
    lat: number;
    arrival: number;
    departure: number;
    orig: string;
    zoneId: string;
    stopIndex: number;
    stopSequence: number;
    vertexType: VertexType;
    bikeShareId: string;
};
