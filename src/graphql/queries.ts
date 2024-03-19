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
    isLocalAuthorityRegistered
    address3
    county
    locality
    street
    phone
    town
    website
    distance
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
    isLocalAuthorityRegistered
    address3
    county
    locality
    street
    phone
    town
    website
    distance
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
    isLocalAuthorityRegistered
    address3
    county
    locality
    street
    phone
    town
    website
    distance
    __typename
  }
}
` as GeneratedQuery<APITypes.GetSchoolsQueryVariables, APITypes.GetSchoolsQuery>;
export const getRegisteredSchools = /* GraphQL */ `query GetRegisteredSchools {
  getRegisteredSchools {
    urn
    name
    localAuthority
    postcode
    registered
    isLocalAuthorityRegistered
    address3
    county
    locality
    street
    phone
    town
    website
    distance
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetRegisteredSchoolsQueryVariables,
  APITypes.GetRegisteredSchoolsQuery
>;
export const getRegisteredSchoolsByLa =
  /* GraphQL */ `query GetRegisteredSchoolsByLa($localAuthority: String!) {
  getRegisteredSchoolsByLa(localAuthority: $localAuthority) {
    urn
    name
    localAuthority
    postcode
    registered
    isLocalAuthorityRegistered
    address3
    county
    locality
    street
    phone
    town
    website
    distance
    __typename
  }
}
` as GeneratedQuery<
    APITypes.GetRegisteredSchoolsByLaQueryVariables,
    APITypes.GetRegisteredSchoolsByLaQuery
  >;
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
    school
    jobTitle
    phone
    charityName
    charityAddress
    aboutCharity
    __typename
  }
}
` as GeneratedQuery<APITypes.GetJoinRequestsQueryVariables, APITypes.GetJoinRequestsQuery>;
export const getSchoolProfile =
  /* GraphQL */ `query GetSchoolProfile($name: String!, $id: String!) {
  getSchoolProfile(name: $name, id: $id) {
    name
    id
    localAuthority
    postcode
    header {
      phone
      email
      website
      uniformPolicy
      __typename
    }
    about
    request {
      items
      whatToExpect
      actionText
      __typename
    }
    donate {
      items
      whatToExpect
      actionText
      __typename
    }
    excess {
      items
      whatToExpect
      actionText
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<APITypes.GetSchoolProfileQueryVariables, APITypes.GetSchoolProfileQuery>;
export const getCharityProfile =
  /* GraphQL */ `query GetCharityProfile($name: String!, $id: String!) {
  getCharityProfile(name: $name, id: $id) {
    name
    id
    localAuthority
    postcode
    header {
      phone
      email
      website
      address
      __typename
    }
    about
    request {
      items
      whatToExpect
      actionText
      __typename
    }
    donate {
      items
      whatToExpect
      actionText
      __typename
    }
    excess {
      items
      whatToExpect
      actionText
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<APITypes.GetCharityProfileQueryVariables, APITypes.GetCharityProfileQuery>;
export const getLocalAuthorityUser = /* GraphQL */ `query GetLocalAuthorityUser($email: String!) {
  getLocalAuthorityUser(email: $email) {
    name
    firstName
    lastName
    jobTitle
    department
    email
    phone
    notes
    nameId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetLocalAuthorityUserQueryVariables,
  APITypes.GetLocalAuthorityUserQuery
>;
export const getSignUpData = /* GraphQL */ `query GetSignUpData($id: String!) {
  getSignUpData(id: $id) {
    id
    email
    type
    name
    nameId
    __typename
  }
}
` as GeneratedQuery<APITypes.GetSignUpDataQueryVariables, APITypes.GetSignUpDataQuery>;
export const getSchoolsNearby =
  /* GraphQL */ `query GetSchoolsNearby($postcode: String!, $distance: Float!) {
  getSchoolsNearby(postcode: $postcode, distance: $distance) {
    urn
    name
    localAuthority
    postcode
    registered
    isLocalAuthorityRegistered
    address3
    county
    locality
    street
    phone
    town
    website
    distance
    __typename
  }
}
` as GeneratedQuery<APITypes.GetSchoolsNearbyQueryVariables, APITypes.GetSchoolsNearbyQuery>;
export const getSchoolJoinRequestsByLa =
  /* GraphQL */ `query GetSchoolJoinRequestsByLa($localAuthority: String!) {
  getSchoolJoinRequestsByLa(localAuthority: $localAuthority) {
    name
    localAuthority
    type
    requestTime
    status
    email
    school
    jobTitle
    phone
    charityName
    charityAddress
    aboutCharity
    __typename
  }
}
` as GeneratedQuery<
    APITypes.GetSchoolJoinRequestsByLaQueryVariables,
    APITypes.GetSchoolJoinRequestsByLaQuery
  >;
