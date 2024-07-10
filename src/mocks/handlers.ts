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
  graphql.mutation('UpdateJoinRequest', () => {
    return HttpResponse.json({
      data: {
        acknowledged: true,
      },
    });
  }),
  graphql.mutation('DeleteDeniedJoinRequest', () => {
    return HttpResponse.json({
      data: {
        acknowledged: true,
      },
    });
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
  graphql.mutation('UpdateSchoolProfile', ({ variables }) => {
    const { value } = variables;
    if (String(value)?.includes('error')) {
      return HttpResponse.error() as AsyncResponseResolverReturnType<GraphQLQuery>;
    }
    return HttpResponse.json({
      data: {
        acknowledged: true,
      },
    });
  }),
  graphql.mutation('UpdateCharityProfile', ({ variables }) => {
    const { value } = variables;
    if (value === 'error') {
      return HttpResponse.error() as AsyncResponseResolverReturnType<GraphQLQuery>;
    }
    return HttpResponse.json({
      data: {
        acknowledged: true,
      },
    });
  }),
  http.post('https://cognito-identity.eu-west-2.amazonaws.com/', () => {
    return passthrough();
  }),
  http.post('https://test/graphql', () => {
    return passthrough();
  }),
  http.get('/*.webp', () => {
    return passthrough();
  }),
];
