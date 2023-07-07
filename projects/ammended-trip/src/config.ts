/**
 * Configuration for OpenTripPlanner.
 */
const openTripPlannerConfig = {
    url: process.env['MAAS_OTP_URL'],
    apiKey: process.env['MAAS_OTP_API_KEY'],
} as const;

/**
 * Default configuration for the lambda.
 */
const config = {
    production: process.env['NODE_ENV'] === 'production',
    otp: openTripPlannerConfig,
} as const;

export default config;
