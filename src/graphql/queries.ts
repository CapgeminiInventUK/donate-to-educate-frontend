/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from '../types/api';
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getSchoolByName = /* GraphQL */ `query GetSchoolByName($name: String!) {
  getSchoolByName(name: $name) {
    urn
    name
    localAuthority
    postcode
    registered
    __typename
  }
}
` as GeneratedQuery<APITypes.GetSchoolByNameQueryVariables, APITypes.GetSchoolByNameQuery>;
export const getSchoolsByLa = /* GraphQL */ `query GetSchoolsByLa($name: String!) {
  getSchoolsByLa(name: $name) {
    urn
    name
    localAuthority
    postcode
    registered
    __typename
  }
}
` as GeneratedQuery<APITypes.GetSchoolsByLaQueryVariables, APITypes.GetSchoolsByLaQuery>;
export const getSchools = /* GraphQL */ `query GetSchools {
  getSchools {
    urn
    name
    localAuthority
    postcode
    registered
    __typename
  }
}
` as GeneratedQuery<APITypes.GetSchoolsQueryVariables, APITypes.GetSchoolsQuery>;
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
export const getSchoolProfile = /* GraphQL */ `query GetSchoolProfile($name: String!) {
  getSchoolProfile(name: $name) {
    request
    donate
    excess
    __typename
  }
}
` as GeneratedQuery<APITypes.GetSchoolProfileQueryVariables, APITypes.GetSchoolProfileQuery>;
