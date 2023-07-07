import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import requireEnv from './require-env';

export class MaasInfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const getAmendedTripLambda = new lambda.Function(this, 'GetAmendedTrip', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'src/main.handler',
      code: lambda.Code.fromAsset('../projects/ammended-trip/dist'),
      timeout: cdk.Duration.seconds(2),
      description: 'Lambda function for that appends CO2 emissions to trips.',
      memorySize: 128,
      reservedConcurrentExecutions: 2,
      environment: {
          MAAS_OTP_URL: requireEnv('MAAS_OTP_URL'),
          MAAS_OTP_API_KEY: requireEnv('MAAS_OTP_API_KEY'),
          NODE_ENV: 'production',
      },
    });
  
    const apiGateway = new apigateway.RestApi(this, 'TripApi', {
        restApiName: 'Trip API',
        description: 'API for getting trips with CO2 emissions.',
    });
    
    const integration = new apigateway.LambdaIntegration(getAmendedTripLambda);
    const planResource = apiGateway.root.addResource('plan');
    const getPlanMethod = planResource.addMethod('GET', integration);
  }
}
