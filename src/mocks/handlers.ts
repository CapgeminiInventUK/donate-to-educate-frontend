import {
  AsyncResponseResolverReturnType,
  GraphQLQuery,
  HttpResponse,
  graphql,
  http,
  passthrough,
} from 'msw';
import getSchoolQueryResponse from './data/getSchoolQuery.json';
import getSchoolsNearbyQueryResponse from './data/getSchoolsNearbyQuery.json';
import { nonExistentPostcode, validPostcode } from './mockParams';

export const handlers = [
  graphql.query('GetSchool', ({ variables }) => {
    if (!String(variables.name).includes('Error')) {
      return HttpResponse.json({
        data: getSchoolQueryResponse,
      });
    }
    return HttpResponse.error() as AsyncResponseResolverReturnType<GraphQLQuery>;
  }),
  graphql.query('GetSchoolsNearby', ({ variables }) => {
    const { postcode } = variables;
    if (postcode === validPostcode) {
      return HttpResponse.json({
        data: getSchoolsNearbyQueryResponse,
      });
    }
    if (postcode === nonExistentPostcode) {
      return HttpResponse.error() as AsyncResponseResolverReturnType<GraphQLQuery>;
    }
  }),
  http.post('https://cognito-identity.eu-west-2.amazonaws.com/', () => {
    return passthrough();
  }),
  http.get('/*.webp', () => {
    return passthrough();
  }),
];
