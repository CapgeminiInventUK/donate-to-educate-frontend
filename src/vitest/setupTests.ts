import 'vitest-dom/extend-expect';
import { server } from '../mocks/server';
import { amplifyConfig } from '../amplify.config';
import { Amplify } from 'aws-amplify';
import { afterAll, afterEach, beforeAll } from 'vitest';

// Establish API mocking before all tests.
beforeAll(() => {
  Amplify.configure(amplifyConfig);
  server.listen();
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
});

// Clean up after the tests are finished.
afterAll(() => {
  server.close();
  vi.resetAllMocks();
});
