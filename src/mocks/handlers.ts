import {
  AsyncResponseResolverReturnType,
  GraphQLQuery,
  HttpResponse,
  graphql,
  http,
  passthrough,
} from 'msw';
import getSchoolQueryResponse from './data/getSchoolQuery.json';

export const handlers = [
  graphql.query('GetSchool', ({ variables }) => {
    if (!String(variables.name).includes('Error')) {
      return HttpResponse.json({
        data: getSchoolQueryResponse,
      });
    }
    return HttpResponse.error() as AsyncResponseResolverReturnType<GraphQLQuery>;
  }),
  http.post('https://cognito-identity.eu-west-2.amazonaws.com/', () => {
    return passthrough();
  }),
  http.get('/*.webp', () => {
    return passthrough();
  }),
];
