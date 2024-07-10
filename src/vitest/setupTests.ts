import 'vitest-dom/extend-expect';
import { server } from '../mocks/server';
import { amplifyConfig } from '../amplify.config';
import { Amplify } from 'aws-amplify';
import { afterAll, afterEach, beforeAll } from 'vitest';

// Establish API mocking before all tests.
beforeAll(() => {
  Amplify.configure(amplifyConfig);
  server.listen();
  window.scrollTo = (): void => {
    undefined;
  };
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
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
