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
    status
    email
    __typename
  }
}
` as GeneratedQuery<APITypes.GetJoinRequestsQueryVariables, APITypes.GetJoinRequestsQuery>;
export const getSchoolProfile = /* GraphQL */ `query GetSchoolProfile($name: String!) {
  getSchoolProfile(name: $name) {
    request {
      items
      banner
      helpBannerTitle
      helpBannerBody
      whatToExpect
      actionText
    }
    donate {
      items
      banner
      helpBannerTitle
      helpBannerBody
      whatToExpect
      actionText
    }
    excess {
      items
      banner
      helpBannerTitle
      helpBannerBody
      whatToExpect
      actionText
    }
    __typename
  }
}
` as GeneratedQuery<APITypes.GetSchoolProfileQueryVariables, APITypes.GetSchoolProfileQuery>;
export const getSignUpData = /* GraphQL */ `query GetSignUpData($id: String!) {
  getSignUpData(id: $id) {
    id
    email
    type
    __typename
  }
}
` as GeneratedQuery<APITypes.GetSignUpDataQueryVariables, APITypes.GetSignUpDataQuery>;
