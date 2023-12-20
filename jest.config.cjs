/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/jest/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|scss|modules.scss)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
  },
  coveragePathIgnorePatterns: ['src/jest/', 'vite-env.d.ts', 'src/assets', 'src/amplify.config.ts'],
  collectCoverageFrom: ['<rootDir>/src/**'],
  coverageThreshold: {
    global: {
      branches: 1,
      functions: 1,
      lines: 1,
      statements: 1,
    },
  },
};
