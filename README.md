## Donate to Educate Frontend

This repo contains all of the code for the frontend application written in TypeScript and React

## Running locally

Install dependencies by running `npm i`, then run the command `npm run dev`

## Building

Run the command `npm run build`

## Environment variables

You need to set the following environment variables in a file called .env at the root

```JavaScript
VITE_AWS_REGION = "eu-west-2"
VITE_APPSYNC_ENDPOINT = "https://localhost:9000"
VITE_COGNITO_USER_POOLS_ID = "eu-west-2_5vqFlUEoR"
VITE_APPSYNC_API_KEY = "somekey"
VITE_ANALYTICS_APP_ID = "someID"
VITE_COGNITO_IDENTITY_POOLS_ID = "someID"
VITE_USER_POOL_WEB_CLIENT_ID = "someID"
```

## GraphQL type generation

The schema.graphql file has been duplicated from the BE repo and needs to be kept in sync manually until we find a better method. To generate the types you need to run `npm run codegen`
