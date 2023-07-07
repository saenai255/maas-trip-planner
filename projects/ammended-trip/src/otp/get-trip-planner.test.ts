import Axios from 'axios';
import { getTripPlanner } from './get-trip-planner';
import TripPlannerResponse from './dto/trip-planner-response';

jest.mock('axios', () => ({
    default: {
        get: jest.fn(),
    },
}));

describe('getTripPlanner', () => {
    const axiosGetMock = Axios.get as jest.MockedFunction<typeof Axios.get>;

    it('should return routes', async () => {
        const expectedResponse: TripPlannerResponse = {} as any;
        axiosGetMock.mockResolvedValueOnce({
            data: expectedResponse,
        } as any);

        const result = await getTripPlanner([0, 0], [0, 0]);
        expect(axiosGetMock).toHaveBeenCalledTimes(1);
        expect(result).toBe(expectedResponse);
    });

    it('should throw an error if the request fails', async () => {
        axiosGetMock.mockRejectedValueOnce(new Error('Request failed'));

        await expect(getTripPlanner([0, 0], [0, 0])).rejects.toThrowErrorMatchingSnapshot();
    });
});
