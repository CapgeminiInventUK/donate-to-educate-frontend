import * as APITypes from '../types/api';
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
