enum TransportationMode {
    Airplane = 'AIRPLANE',
    Bicycle = 'BICYCLE',
    BicycleRent = 'BICYCLE_RENT',
    Bus = 'BUS',
    Car = 'CAR',
    EScooter = 'ESCOOTER',
    Ferry = 'FERRY',
    Funicular = 'FUNICULAR',
    Metro = 'METRO',
    PublicTransit = 'PUBLIC_TRANSIT',
    Rail = 'RAIL',
    Scooter = 'SCOOTER',
    SharedBicycle = 'SHARED_BICYCLE',
    Subway = 'SUBWAY',
    Taxi = 'TAXI',
    Tram = 'TRAM',
    Walk = 'WALK',
    Wait = 'WAIT',
    Train = 'TRAIN',
}

/**
 * CO2 Multipliers in g/km
 */
const CO2Multipliers: Record<TransportationMode, number> = {
    [TransportationMode.Airplane]: 144,
    [TransportationMode.Bicycle]: 0,
    [TransportationMode.BicycleRent]: 0,
    [TransportationMode.Bus]: 74,
    [TransportationMode.Car]: 160,
    [TransportationMode.EScooter]: 110,
    [TransportationMode.Ferry]: 144,
    [TransportationMode.Funicular]: 54,
    [TransportationMode.Metro]: 54,
    [TransportationMode.PublicTransit]: 74,
    [TransportationMode.Rail]: 14,
    [TransportationMode.Scooter]: 75,
    [TransportationMode.SharedBicycle]: 0,
    [TransportationMode.Subway]: 74,
    [TransportationMode.Taxi]: 250,
    [TransportationMode.Train]: 14,
    [TransportationMode.Tram]: 54,
    [TransportationMode.Walk]: 0,
    [TransportationMode.Wait]: 0,
} as const;

/**
 * Returns the CO2/km multiplier for the given transportation mode.
 */
function getCO2MultiplierOrNull(mode: TransportationMode): number | null {
    return CO2Multipliers[mode] ?? null;
}

/**
 * Returns the CO2 emissions (as grams) for a given distance and transportation mode.
 */
function calculateCO2Emissions(distanceInMeters: number, transportationMode: TransportationMode): number {
    const co2Multiplier = getCO2MultiplierOrNull(transportationMode);
    if (co2Multiplier === null) {
        throw new Error(`Could not find CO2 multiplier for transportation mode ${transportationMode}`);
    }

    const distanceInKm = distanceInMeters / 1000;
    return distanceInKm * co2Multiplier;
}

export { TransportationMode, getCO2MultiplierOrNull, calculateCO2Emissions };
