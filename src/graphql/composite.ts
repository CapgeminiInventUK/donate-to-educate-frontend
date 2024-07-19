import type * as APITypes from '../types/api';
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getAdminPageRequests = `query getAdminPageRequests {
    getLocalAuthorities {
        code
        name
        registered
        __typename
      }
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
        __typename
      }
}` as GeneratedQuery<
  APITypes.GetJoinRequestsQueryVariables & APITypes.GetLocalAuthoritiesQueryVariables,
  APITypes.GetJoinRequestsQuery & APITypes.GetLocalAuthoritiesQuery
>;

export const getSchoolsAndLocalAuthorities = `query getSchoolsAndLocalAuthorities {
    getLocalAuthorities {
        code
        name
        registered
        __typename
      }
      getSchools {
        urn
        name
        localAuthority
        postcode
        registered
        __typename
      }
}` as GeneratedQuery<
  APITypes.GetJoinRequestsQueryVariables & APITypes.GetLocalAuthoritiesQueryVariables,
  APITypes.GetLocalAuthoritiesQuery & APITypes.GetSchoolsQuery
>;
