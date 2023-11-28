/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AWS_REGION: string;
  readonly VITE_APPSYNC_ENDPOINT: string;
  readonly VITE_COGNITO_USER_POOLS_ID: string;
  readonly VITE_APPSYNC_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
