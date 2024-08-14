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
import getAdminTileStatsQueryResponse from './data/getAdminTileStatsQuery.json';
import getCharitiesQueryResponse from './data/getCharitiesQuery.json';
import getRegisteredSchoolsQueryResponse from './data/getRegisteredSchoolsQuery.json';
import getLocalAuthoritiesQueryResponse from './data/getLocalAuthoritiesQuery.json';
import getJoinRequestsQueryResponse from './data/getJoinRequestsQuery.json';
import getCharityProfileQueryResponse from './data/getCharityProfileQuery.json';
import getSchoolProfileQueryResponse from './data/getSchoolProfileQuery.json';
import { nonExistentPostcode, validPostcode } from './mockParams';
import { checkForStringAndReturnEmptyIfFalsy } from '@/utils/globals';
import { amplifyConfig } from '@/amplify.config';

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
  graphql.query('GetAdminTileStats', () => {
    return HttpResponse.json({
      data: getAdminTileStatsQueryResponse,
    });
  }),
  graphql.query('GetCharities', () => {
    return HttpResponse.json({
      data: getCharitiesQueryResponse,
    });
  }),
  graphql.query('GetRegisteredSchools', () => {
    return HttpResponse.json({
      data: getRegisteredSchoolsQueryResponse,
    });
  }),
  graphql.query('GetLocalAuthorities', () => {
    return HttpResponse.json({
      data: getLocalAuthoritiesQueryResponse,
    });
  }),
  graphql.query('GetJoinRequests', () => {
    return HttpResponse.json({
      data: getJoinRequestsQueryResponse,
    });
  }),
  graphql.query('GetCharityProfile', ({ variables }) => {
    const { name, id } = variables;
    if ([name, id].includes('error')) {
      return HttpResponse.error() as AsyncResponseResolverReturnType<GraphQLQuery>;
    }
    return HttpResponse.json({
      data: getCharityProfileQueryResponse,
    });
  }),
  graphql.query('GetSchoolProfile', ({ variables }) => {
    const { name, id } = variables;
    if ([name, id].includes('error')) {
      return HttpResponse.error() as AsyncResponseResolverReturnType<GraphQLQuery>;
    }
    return HttpResponse.json({
      data: getSchoolProfileQueryResponse,
    });
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
  graphql.mutation('UpdateSchoolProfile', ({ variables }) => {
    const { value } = variables;
    if (String(value).includes('error')) {
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
    if (String(value).includes('error')) {
      return HttpResponse.error() as AsyncResponseResolverReturnType<GraphQLQuery>;
    }
    return HttpResponse.json({
      data: {
        acknowledged: true,
      },
    });
  }),
  graphql.mutation('InsertItemQuery', ({ variables }) => {
    const { organisationId } = variables;
    if (organisationId === 'error') {
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
  http.post(checkForStringAndReturnEmptyIfFalsy(amplifyConfig.API?.GraphQL?.endpoint), () => {
    return passthrough();
  }),
  http.get('/*.webp', () => {
    return passthrough();
  }),
];
