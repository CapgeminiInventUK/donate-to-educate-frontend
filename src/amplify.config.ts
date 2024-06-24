import { ResourcesConfig } from 'aws-amplify';
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

export const amplifyConfig: ResourcesConfig = {
  API: {
    GraphQL: {
      region: env.VITE_AWS_REGION,
      endpoint: env.VITE_APPSYNC_ENDPOINT,
      apiKey: env.VITE_APPSYNC_API_KEY,
      defaultAuthMode: 'apiKey',
    },
  },

  Auth: {
    Cognito: {
      userPoolId: env.VITE_COGNITO_USER_POOLS_ID,
      userPoolClientId: env.VITE_USER_POOL_WEB_CLIENT_ID,
      identityPoolId: env.VITE_COGNITO_IDENTITY_POOLS_ID,
      allowGuestAccess: true,
    },
  },

  Analytics: {
    Pinpoint: {
      region: env.VITE_AWS_REGION,
      appId: env.VITE_ANALYTICS_APP_ID,
    },
  },

  Geo: {
    LocationService: {
      region: env.VITE_AWS_REGION,
      maps: {
        items: [
          'VectorEsriNavigation',
          'VectorEsriTopographic',
          'VectorEsriLightGrayCanvas',
          'VectorEsriDarkGrayCanvas',
          'VectorHereExplore',
          'VectorOpenDataStandardLight',
          'VectorOpenDataStandardDark',
          'VectorOpenDataVisualizationLight',
          'VectorOpenDataVisualizationDark',
        ].reduce(
          (acc, map) => {
            return { ...acc, [map]: { style: map } };
          },
          {} as Record<string, { style: string }>
        ),
        default: 'VectorHereExplore',
      },
    },
  },
};
