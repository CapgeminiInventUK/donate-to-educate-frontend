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

# Components

## TextInput

A reusable text input component.

```tsx
import TextInput from '@components/TextInput/TextInput';
```

### Usage

The TextInput component can be used as follows:

```jsx
<TextInput 
  header="Your Header"
  validator={yourValidatorFunction}
  placeholder="Placeholder Text"
  password={true}
/>
```

### Props

The TextInput component accepts the following props:

- `header`: (string) The header text displayed above the input field.
- `validator`: (function) A validation function that accepts the input value and returns an object with `isValid` (boolean) and `errorMessage` (string, optional) properties.
- `placeholder`: (string, optional) Placeholder text to display in the input field.
- `password`: (boolean, default = false) If `true`, displays the input field as a password input.

#### Validator

The validator on the text box is expecting a boolean result where false means it failed validation. There is also an error message expected to be returned which is then displayed as an error message on the component.

```tsx
import { ValidationResult } from '@/types/props'
```

```ts
interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}
```
