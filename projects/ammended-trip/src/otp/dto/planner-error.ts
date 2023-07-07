export enum Message {
    PlanOk = 'PLAN_OK',
    SystemError = 'SYSTEM_ERROR',
    GraphUnavailable = 'GRAPH_UNAVAILABLE',
    OutsideBounds = 'OUTSIDE_BOUNDS',
    PathNotFound = 'PATH_NOT_FOUND',
    NoTransitTimes = 'NO_TRANSIT_TIMES',
    RequestTimeout = 'REQUEST_TIMEOUT',
    BogusParameter = 'BOGUS_PARAMETER',
    GeocodeFromNotFound = 'GEOCODE_FROM_NOT_FOUND',
    GeocodeToNotFound = 'GEOCODE_TO_NOT_FOUND',
    GeocodeFromToNotFound = 'GEOCODE_FROM_TO_NOT_FOUND',
    TooClose = 'TOO_CLOSE',
    LocationNotAccessible = 'LOCATION_NOT_ACCESSIBLE',
    GeocodeFromAmbiguous = 'GEOCODE_FROM_AMBIGUOUS',
    GeocodeToAmbiguous = 'GEOCODE_TO_AMBIGUOUS',
    GeocodeFromToAmbiguous = 'GEOCODE_FROM_TO_AMBIGUOUS',
    UnderspecifiedTriangle = 'UNDERSPECIFIED_TRIANGLE',
    TriangleNotAffine = 'TRIANGLE_NOT_AFFINE',
    TriangleOptimizeTypeNotSet = 'TRIANGLE_OPTIMIZE_TYPE_NOT_SET',
    TriangleValuesNotSet = 'TRIANGLE_VALUES_NOT_SET',
}
export type PlannerError = {
    id: number;
    msg: string;
    message: Message;
    missing: string[];
};
