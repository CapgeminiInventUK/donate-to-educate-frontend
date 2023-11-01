import { z } from 'zod';

const envSchema = z.object({
  VITE_AWS_REGION: z.string().min(1),
  VITE_APPSYNC_ENDPOINT: z.string().min(1),
  VITE_COGNITO_USER_POOLS_ID: z.string().min(1),
  VITE_APPSYNC_API_KEY: z.string().min(1),
});

const env = envSchema.parse(import.meta.env);

export const amplifyConfig = {
  // Generic
  aws_project_region: env.VITE_AWS_REGION,

  // AppSync
  aws_appsync_region: env.VITE_AWS_REGION,
  aws_appsync_graphqlEndpoint: env.VITE_APPSYNC_ENDPOINT,
  aws_appsync_authenticationType: 'API_KEY', // TODO need to change to AWS_IAM
  aws_appsync_apiKey: env.VITE_APPSYNC_API_KEY,

  // Cognito
  aws_cognito_region: env.VITE_AWS_REGION,
  aws_user_pools_id: env.VITE_COGNITO_USER_POOLS_ID,
  aws_user_pools_web_client_id: '68vvv67nra2567fl2m83so533k',
};
