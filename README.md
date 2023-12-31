## Donate to Educate Frontend

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Docker

Run the following command to build a docker container of the application. This will build the application then deploy a static server on the port '5173'

```cli
docker compose up
```

If you want to run the vita preview server change the 'dockerfile' in [docker-compose.yml](./docker-compose.yml) to 'dockerfile-dev'

## Environment variables

You need to set the following environment variables in a file called .env at the root

```JavaScript
VITE_AWS_REGION = "eu-west-2"
VITE_APPSYNC_ENDPOINT = "https://localhost:9000"
VITE_COGNITO_USER_POOLS_ID = "eu-west-2_5vqFlUEoR"
VITE_APPSYNC_API_KEY = "somekey"
VITE_ANALYTICS_APP_ID = "someID"
VITE_COGNITO_IDENTITY_POOLS_ID = "someID"
```
