/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from '../types/api';
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getLocalAuthorities = /* GraphQL */ `query GetLocalAuthorities {
  getLocalAuthorities {
    code
    name
    registered
    __typename
  }
}
` as GeneratedQuery<APITypes.GetLocalAuthoritiesQueryVariables, APITypes.GetLocalAuthoritiesQuery>;
export const getJoinRequests = /* GraphQL */ `query GetJoinRequests {
  getJoinRequests {
    name
    localAuthority
    type
    requestTime
    __typename
  }
}
` as GeneratedQuery<APITypes.GetJoinRequestsQueryVariables, APITypes.GetJoinRequestsQuery>;

export const getAdminPageRequests = `query getAdminPageRequests {
    getLocalAuthorities {
        code
        name
        registered
        __typename
      }
    getJoinRequests {
        name
        localAuthority
        type
        requestTime
        __typename
      }
}` as GeneratedQuery<
  APITypes.GetJoinRequestsQueryVariables & APITypes.GetLocalAuthoritiesQueryVariables,
  APITypes.GetJoinRequestsQuery & APITypes.GetLocalAuthoritiesQuery
>;
