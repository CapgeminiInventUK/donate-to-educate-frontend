import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  AsyncResponseResolverReturnType,
  GraphQLHandler,
  GraphQLQuery,
  HttpHandler,
  HttpResponse,
  graphql,
  http,
} from 'msw';
import { ComponentType, FC, ReactNode } from 'react';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import { amplifyConfig } from '@/amplify.config';
import { checkForStringAndReturnEmptyIfFalsy } from '@/utils/globals';

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

export const setupFailedNetworkRequest = (): HttpHandler => {
  return http.post(
    checkForStringAndReturnEmptyIfFalsy(amplifyConfig.API?.GraphQL?.endpoint),
    () => HttpResponse.error() as AsyncResponseResolverReturnType<GraphQLQuery>
  );
};

export const useDifferentResponseDataToDefault = (query: string, data?: object): GraphQLHandler => {
  return graphql.query(query, () => {
    return HttpResponse.json({
      data,
    });
  });
};
