module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@typescript-eslint', 'prettier'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto',
      },
      {
        usePrettierrc: true,
      },
    ],
    'no-console': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/unbound-method': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/quotes': [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    'jsx-quotes': [2, 'prefer-double'],
    '@typescript-eslint/func-call-spacing': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
    '@typescript-eslint/await-thenable': 'off',
  },
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.test.tsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
};
