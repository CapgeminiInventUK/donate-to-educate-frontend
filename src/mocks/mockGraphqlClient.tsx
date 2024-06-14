import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HttpResponse, graphql } from 'msw';
import { ComponentType, FC, ReactNode } from 'react';
import { server } from './server';
import { BrowserRouter as Router } from 'react-router-dom';

const createTestQueryClient = (): QueryClient =>
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

export const mockApiResponse = (
  queryName: string,
  response: Record<string, unknown> | null,
  throwError = false
): void => {
  server.use(
    graphql.query(queryName, () => {
      // eslint-disable-next-line no-console
      console.log('here');
      if (throwError) {
        return HttpResponse.json({ data: { isError: true } });
      }
      return HttpResponse.json(response);
    })
  );
};
