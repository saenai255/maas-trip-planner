import TripPlannerResponse from './otp/dto/trip-planner-response';
import run, { mapToResponse } from './service';
import Response from './dto/response';
import api from './otp/api';

jest.mock('./otp/api', () => ({
    default: {
        tripPlanner: {
            get: jest.fn(),
        },
    },
}));

describe('service', () => {
    describe('mapToResponse', () => {
        it('should map a TripPlannerResponse to a Response', () => {
            const input: TripPlannerResponse = {
                plan: {
                    from: {
                        lat: 0,
                        lon: 0,
                    },
                    to: {
                        lat: 0,
                        lon: 0,
                    },
                    itineraries: [
                        {
                            duration: 1000,
                            startTime: 1000,
                            endTime: 2000,
                            legs: [
                                {
                                    mode: 'BUS',
                                    distance: 1000,
                                    routeShortName: '1',
                                },
                                {
                                    mode: 'FUNICULAR',
                                    distance: 2000,
                                    routeShortName: '2',
                                },
                                {
                                    mode: 'WALK',
                                    distance: 100,
                                    routeShortName: '3',
                                },
                            ],
                        },
                    ],
                },
            } as any;

            const expectedResponse: Response = {
                plan: {
                    from: {
                        coordinates: [0, 0],
                    },
                    to: {
                        coordinates: [0, 0],
                    },
                    itineraries: [
                        {
                            distance: 1000 + 2000 + 100,
                            duration: 1000,
                            startTime: new Date(1000).toISOString(),
                            endTime: new Date(2000).toISOString(),
                            co2: 74 + 108 + 0,
                            legs: [
                                {
                                    mode: 'BUS',
                                    co2: 74,
                                    distance: 1000,
                                    routeShortName: '1',
                                },
                                {
                                    mode: 'FUNICULAR',
                                    co2: 108,
                                    distance: 2000,
                                    routeShortName: '2',
                                },
                                {
                                    mode: 'WALK',
                                    co2: 0,
                                    distance: 100,
                                    routeShortName: '3',
                                },
                            ],
                        },
                    ],
                },
            };

            const result = mapToResponse(input);
            expect(result).toEqual(expectedResponse);
        });
    });

    describe('run', () => {
        const getTripPlannerMock = api.tripPlanner.get as jest.MockedFunction<typeof api.tripPlanner.get>;

        it('should invoke api.tripPlanner.get', async () => {
            const expectedResponse: Response = {
                plan: {
                    from: {
                        coordinates: [0, 0],
                    },
                    to: {
                        coordinates: [0, 0],
                    },
                    itineraries: [],
                },
            };

            getTripPlannerMock.mockResolvedValueOnce({
                plan: {
                    from: {
                        lat: 0,
                        lon: 0,
                    },
                    to: {
                        lat: 0,
                        lon: 0,
                    },
                    itineraries: [],
                },
            } as any);

            const result = await run([0, 0], [0, 0]);
            expect(getTripPlannerMock).toHaveBeenCalledTimes(1);
            expect(result).toEqual(expectedResponse);
        });
    });
});
