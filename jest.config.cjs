/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/jest/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|scss|modules.scss)$': '<rootDir>/src/jest/styleMock.ts',
  },
  coveragePathIgnorePatterns: ['src/jest/', 'vite-env.d.ts', 'src/assets'],
  collectCoverageFrom: ['<rootDir>/src/**'],
  coverageThreshold: {
    global: {
      branches: 10,
      functions: 10,
      lines: 10,
      statements: 10,
    },
  },
};
