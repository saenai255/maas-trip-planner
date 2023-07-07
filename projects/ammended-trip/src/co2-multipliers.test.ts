import { TransportationMode, calculateCO2Emissions, getCO2MultiplierOrNull } from './co2-multipliers';

describe('co2-multipliers', () => {
    describe('getCO2MultiplierOrNull', () => {
        it('should return a multiplier for a given mode', () => {
            expect(getCO2MultiplierOrNull(TransportationMode.Airplane)).toEqual(144);
        });

        it('should return null for an unknown mode', () => {
            expect(getCO2MultiplierOrNull('UNKNOWN' as TransportationMode)).toEqual(null);
        });
    });

    describe('calculateCO2Emissions', () => {
        it('should calculate the CO2 emissions', () => {
            expect(calculateCO2Emissions(1000, TransportationMode.Bus)).toEqual(74);
        });

        it('should throw when given an unknown mode', () => {
            expect(() => calculateCO2Emissions(1000, 'UNKNOWN' as TransportationMode)).toThrowErrorMatchingSnapshot();
        });
    });
});
