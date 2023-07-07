import { ElevationMetadata } from './elevation-metadata';
import { PlannerError } from './planner-error';
import { TripPlan } from './trip-plan';
import { TripSearchMetadata } from './trip-search-metadata';

type TripPlannerResponse = {
    requestParameters: Record<string, string>;
    elevationMetadata: ElevationMetadata;
    plan: TripPlan;
    metadata: TripSearchMetadata;
    error: PlannerError;
};

export default TripPlannerResponse;
