/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from '../types/api';
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getSchool = /* GraphQL */ `query GetSchool($name: String!, $urn: String!) {
  getSchool(name: $name, urn: $urn) {
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
    profile {
      name
      id
      localAuthority
      postcode
      location {
        type
        coordinates
        __typename
      }
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
        productTypes
        __typename
      }
      donate {
        items
        whatToExpect
        actionText
        productTypes
        __typename
      }
      excess {
        items
        whatToExpect
        actionText
        productTypes
        __typename
      }
      __typename
    }
    hasJoinRequest
    registrationState
    __typename
  }
}
` as GeneratedQuery<APITypes.GetSchoolQueryVariables, APITypes.GetSchoolQuery>;
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
    profile {
      name
      id
      localAuthority
      postcode
      location {
        type
        coordinates
        __typename
      }
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
        productTypes
        __typename
      }
      donate {
        items
        whatToExpect
        actionText
        productTypes
        __typename
      }
      excess {
        items
        whatToExpect
        actionText
        productTypes
        __typename
      }
      __typename
    }
    hasJoinRequest
    registrationState
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
    profile {
      name
      id
      localAuthority
      postcode
      location {
        type
        coordinates
        __typename
      }
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
        productTypes
        __typename
      }
      donate {
        items
        whatToExpect
        actionText
        productTypes
        __typename
      }
      excess {
        items
        whatToExpect
        actionText
        productTypes
        __typename
      }
      __typename
    }
    hasJoinRequest
    registrationState
    __typename
  }
}
` as GeneratedQuery<APITypes.GetSchoolsQueryVariables, APITypes.GetSchoolsQuery>;
export const getCharities = /* GraphQL */ `query GetCharities {
  getCharities {
    id
    localAuthority
    name
    address
    about
    distance
    profile {
      name
      id
      localAuthority
      postcode
      location {
        type
        coordinates
        __typename
      }
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
        productTypes
        __typename
      }
      donate {
        items
        whatToExpect
        actionText
        productTypes
        __typename
      }
      excess {
        items
        whatToExpect
        actionText
        productTypes
        __typename
      }
      __typename
    }
    postcode
    __typename
  }
}
` as GeneratedQuery<APITypes.GetCharitiesQueryVariables, APITypes.GetCharitiesQuery>;
export const getCharitiesByLa = /* GraphQL */ `query GetCharitiesByLa($name: String!) {
  getCharitiesByLa(name: $name) {
    id
    localAuthority
    name
    address
    about
    distance
    profile {
      name
      id
      localAuthority
      postcode
      location {
        type
        coordinates
        __typename
      }
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
        productTypes
        __typename
      }
      donate {
        items
        whatToExpect
        actionText
        productTypes
        __typename
      }
      excess {
        items
        whatToExpect
        actionText
        productTypes
        __typename
      }
      __typename
    }
    postcode
    __typename
  }
}
` as GeneratedQuery<APITypes.GetCharitiesByLaQueryVariables, APITypes.GetCharitiesByLaQuery>;
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
    profile {
      name
      id
      localAuthority
      postcode
      location {
        type
        coordinates
        __typename
      }
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
        productTypes
        __typename
      }
      donate {
        items
        whatToExpect
        actionText
        productTypes
        __typename
      }
      excess {
        items
        whatToExpect
        actionText
        productTypes
        __typename
      }
      __typename
    }
    hasJoinRequest
    registrationState
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
    profile {
      name
      id
      localAuthority
      postcode
      location {
        type
        coordinates
        __typename
      }
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
        productTypes
        __typename
      }
      donate {
        items
        whatToExpect
        actionText
        productTypes
        __typename
      }
      excess {
        items
        whatToExpect
        actionText
        productTypes
        __typename
      }
      __typename
    }
    hasJoinRequest
    registrationState
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
    registeredSchools
    registeredCharities
    __typename
  }
}
` as GeneratedQuery<APITypes.GetLocalAuthoritiesQueryVariables, APITypes.GetLocalAuthoritiesQuery>;
export const getJoinRequests = /* GraphQL */ `query GetJoinRequests {
  getJoinRequests {
    id
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
    urn
    postcode
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
    location {
      type
      coordinates
      __typename
    }
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
      productTypes
      __typename
    }
    donate {
      items
      whatToExpect
      actionText
      productTypes
      __typename
    }
    excess {
      items
      whatToExpect
      actionText
      productTypes
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
    location {
      type
      coordinates
      __typename
    }
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
      productTypes
      __typename
    }
    donate {
      items
      whatToExpect
      actionText
      productTypes
      __typename
    }
    excess {
      items
      whatToExpect
      actionText
      productTypes
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
    privacyPolicyAccepted
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetLocalAuthorityUserQueryVariables,
  APITypes.GetLocalAuthorityUserQuery
>;
export const getLocalAuthorityUsers =
  /* GraphQL */ `query GetLocalAuthorityUsers($id: String!, $name: String) {
  getLocalAuthorityUsers(id: $id, name: $name) {
    name
    firstName
    lastName
    jobTitle
    department
    email
    phone
    notes
    nameId
    privacyPolicyAccepted
    __typename
  }
}
` as GeneratedQuery<
    APITypes.GetLocalAuthorityUsersQueryVariables,
    APITypes.GetLocalAuthorityUsersQuery
  >;
export const getSchoolUser = /* GraphQL */ `query GetSchoolUser($email: String!) {
  getSchoolUser(email: $email) {
    name
    schoolName
    schoolId
    jobTitle
    email
    phone
    __typename
  }
}
` as GeneratedQuery<APITypes.GetSchoolUserQueryVariables, APITypes.GetSchoolUserQuery>;
export const getSchoolUsers = /* GraphQL */ `query GetSchoolUsers($id: String!) {
  getSchoolUsers(id: $id) {
    name
    schoolName
    schoolId
    jobTitle
    email
    phone
    __typename
  }
}
` as GeneratedQuery<APITypes.GetSchoolUsersQueryVariables, APITypes.GetSchoolUsersQuery>;
export const getCharityUser = /* GraphQL */ `query GetCharityUser($email: String!) {
  getCharityUser(email: $email) {
    name
    charityName
    charityId
    jobTitle
    email
    phone
    __typename
  }
}
` as GeneratedQuery<APITypes.GetCharityUserQueryVariables, APITypes.GetCharityUserQuery>;
export const getCharityUsers = /* GraphQL */ `query GetCharityUsers($id: String!) {
  getCharityUsers(id: $id) {
    name
    charityName
    charityId
    jobTitle
    email
    phone
    __typename
  }
}
` as GeneratedQuery<APITypes.GetCharityUsersQueryVariables, APITypes.GetCharityUsersQuery>;
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
    profile {
      name
      id
      localAuthority
      postcode
      location {
        type
        coordinates
        __typename
      }
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
        productTypes
        __typename
      }
      donate {
        items
        whatToExpect
        actionText
        productTypes
        __typename
      }
      excess {
        items
        whatToExpect
        actionText
        productTypes
        __typename
      }
      __typename
    }
    hasJoinRequest
    registrationState
    __typename
  }
}
` as GeneratedQuery<APITypes.GetSchoolsNearbyQueryVariables, APITypes.GetSchoolsNearbyQuery>;
export const getCharitiesNearby =
  /* GraphQL */ `query GetCharitiesNearby($postcode: String!, $distance: Float!) {
  getCharitiesNearby(postcode: $postcode, distance: $distance) {
    id
    localAuthority
    name
    address
    about
    distance
    profile {
      name
      id
      localAuthority
      postcode
      location {
        type
        coordinates
        __typename
      }
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
        productTypes
        __typename
      }
      donate {
        items
        whatToExpect
        actionText
        productTypes
        __typename
      }
      excess {
        items
        whatToExpect
        actionText
        productTypes
        __typename
      }
      __typename
    }
    postcode
    __typename
  }
}
` as GeneratedQuery<APITypes.GetCharitiesNearbyQueryVariables, APITypes.GetCharitiesNearbyQuery>;
export const getSchoolJoinRequestsByLa =
  /* GraphQL */ `query GetSchoolJoinRequestsByLa($localAuthority: String!) {
  getSchoolJoinRequestsByLa(localAuthority: $localAuthority) {
    id
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
    urn
    postcode
    __typename
  }
}
` as GeneratedQuery<
    APITypes.GetSchoolJoinRequestsByLaQueryVariables,
    APITypes.GetSchoolJoinRequestsByLaQuery
  >;
export const getCharityJoinRequestsByLa =
  /* GraphQL */ `query GetCharityJoinRequestsByLa($localAuthority: String!) {
  getCharityJoinRequestsByLa(localAuthority: $localAuthority) {
    id
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
    urn
    postcode
    __typename
  }
}
` as GeneratedQuery<
    APITypes.GetCharityJoinRequestsByLaQueryVariables,
    APITypes.GetCharityJoinRequestsByLaQuery
  >;
export const getAdminTileStats = /* GraphQL */ `query GetAdminTileStats {
  getAdminTileStats {
    la {
      joined
      notJoined
      __typename
    }
    joinRequests {
      school
      charity
      __typename
    }
    registeredSchools
    registeredCharities
    __typename
  }
}
` as GeneratedQuery<APITypes.GetAdminTileStatsQueryVariables, APITypes.GetAdminTileStatsQuery>;
export const getLaStats =
  /* GraphQL */ `query GetLaStats($name: String!, $nameId: String!, $email: String!) {
  getLaStats(name: $name, nameId: $nameId, email: $email) {
    schoolRequests
    charityRequests
    privacyPolicyAccepted
    __typename
  }
}
` as GeneratedQuery<APITypes.GetLaStatsQueryVariables, APITypes.GetLaStatsQuery>;
export const getSchoolsNearbyWithProfile = /* GraphQL */ `query GetSchoolsNearbyWithProfile(
  $postcode: String!
  $distance: Float!
  $limit: Int!
  $type: Type!
) {
  getSchoolsNearbyWithProfile(
    postcode: $postcode
    distance: $distance
    limit: $limit
    type: $type
  ) {
    searchLocation {
      type
      coordinates
      __typename
    }
    results {
      id
      name
      distance
      productTypes
      registered
      location {
        type
        coordinates
        __typename
      }
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetSchoolsNearbyWithProfileQueryVariables,
  APITypes.GetSchoolsNearbyWithProfileQuery
>;
export const getCharitiesNearbyWithProfile = /* GraphQL */ `query GetCharitiesNearbyWithProfile(
  $postcode: String!
  $distance: Float!
  $limit: Int!
  $type: Type!
) {
  getCharitiesNearbyWithProfile(
    postcode: $postcode
    distance: $distance
    limit: $limit
    type: $type
  ) {
    searchLocation {
      type
      coordinates
      __typename
    }
    results {
      id
      name
      distance
      productTypes
      registered
      location {
        type
        coordinates
        __typename
      }
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCharitiesNearbyWithProfileQueryVariables,
  APITypes.GetCharitiesNearbyWithProfileQuery
>;
export const hasSchoolProfile =
  /* GraphQL */ `query HasSchoolProfile($name: String!, $id: String!) {
  hasSchoolProfile(name: $name, id: $id)
}
` as GeneratedQuery<APITypes.HasSchoolProfileQueryVariables, APITypes.HasSchoolProfileQuery>;
export const hasCharityProfile =
  /* GraphQL */ `query HasCharityProfile($name: String!, $id: String!) {
  hasCharityProfile(name: $name, id: $id)
}
` as GeneratedQuery<APITypes.HasCharityProfileQueryVariables, APITypes.HasCharityProfileQuery>;
