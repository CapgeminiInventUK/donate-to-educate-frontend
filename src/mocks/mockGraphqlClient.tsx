import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HttpResponse, graphql } from 'msw';
import type { ComponentType, FC, ReactNode } from 'react';
import { MemoryRouter, BrowserRouter as Router } from 'react-router-dom';
import { server } from './server';

export const createTestQueryClient = (): QueryClient =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

export const createWrapper = (node: ReactNode): ComponentType => {
  const testQueryClient = createTestQueryClient();
  const MockComponent: FC = () => {
    return (
      <Router>
        <QueryClientProvider client={testQueryClient}>{node}</QueryClientProvider>
      </Router>
    );
  };
  return MockComponent;
};

export const createWrapperWithState = (
  node: ReactNode,
  state: Record<string, unknown>
): ComponentType => {
  const testQueryClient = createTestQueryClient();
  const MockComponent: FC = () => {
    return (
      <MemoryRouter initialEntries={[{ state }]}>
        <QueryClientProvider client={testQueryClient}>{node}</QueryClientProvider>
      </MemoryRouter>
    );
  };
  return MockComponent;
};

export const mockApiResponse = (
  queryName: string,
  response: Record<string, unknown> | null,
  throwError = false
): void => {
  server.use(
    graphql.query(queryName, () => {
      if (throwError) {
        return HttpResponse.json({ data: { isError: true } });
      }
      return HttpResponse.json(response);
    })
  );
};
