import { z } from 'zod';

const envSchema = z.object({
  VITE_AWS_REGION: z.string().min(1),
  VITE_APPSYNC_ENDPOINT: z.string().min(1),
  VITE_COGNITO_USER_POOLS_ID: z.string().min(1),
  VITE_APPSYNC_API_KEY: z.string().min(1),
  VITE_ANALYTICS_APP_ID: z.string().min(1),
  VITE_COGNITO_IDENTITY_POOLS_ID: z.string().min(1),
  VITE_USER_POOL_WEB_CLIENT_ID: z.string().min(1),
});

const env = envSchema.parse(import.meta.env);

export const amplifyConfig = {
  // Generic
  aws_project_region: env.VITE_AWS_REGION,

  // AppSync
  aws_appsync_region: env.VITE_AWS_REGION,
  aws_appsync_graphqlEndpoint: env.VITE_APPSYNC_ENDPOINT,
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: env.VITE_APPSYNC_API_KEY,

  // Cognito
  aws_cognito_region: env.VITE_AWS_REGION,
  aws_user_pools_id: env.VITE_COGNITO_USER_POOLS_ID,
  aws_user_pools_web_client_id: env.VITE_USER_POOL_WEB_CLIENT_ID,
  aws_cognito_identity_pool_id: env.VITE_COGNITO_IDENTITY_POOLS_ID,
  aws_mandatory_sign_in: false,

  // Pinpoint
  aws_mobile_analytics_app_region: env.VITE_AWS_REGION,
  aws_mobile_analytics_app_id: env.VITE_ANALYTICS_APP_ID,
};
