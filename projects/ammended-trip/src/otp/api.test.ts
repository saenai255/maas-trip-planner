import api from './api';
import { getTripPlanner } from './get-trip-planner';

jest.mock('./get-trip-planner', () => ({
    getTripPlanner: jest.fn(),
}));

describe('OpenTripPlanner API', () => {
    describe('tripPlanner', () => {
        const getTripPlannerMock = getTripPlanner as jest.MockedFunction<typeof getTripPlanner>;
        it('should return a TripPlannerResponse', async () => {
            const expectedResponse = {} as any;
            getTripPlannerMock.mockResolvedValueOnce(expectedResponse);

            const response = await api.tripPlanner.get([0, 0], [0, 0]);
            expect(getTripPlannerMock).toHaveBeenCalledTimes(1);
            expect(response).toBe(expectedResponse);
        });

        it('should throw an error if the request fails', async () => {
            getTripPlannerMock.mockRejectedValueOnce(new Error('Request failed'));

            await expect(api.tripPlanner.get([0, 0], [0, 0])).rejects.toThrowErrorMatchingSnapshot();
        });
    });
});
