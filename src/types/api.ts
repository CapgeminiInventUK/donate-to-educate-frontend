/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type LocalAuthority = {
  __typename: 'LocalAuthority';
  code: string;
  name: string;
  registered: boolean;
};

export type JoinRequest = {
  __typename: 'JoinRequest';
  name: string;
  localAuthority: string;
  type: string;
  requestTime: number;
  status: string;
  email: string;
};

export type School = {
  __typename: 'School';
  urn: string;
  name: string;
  localAuthority: string;
  postcode?: string | null;
  registered: boolean;
};

export type SchoolProfile = {
  __typename: 'SchoolProfile';
  request?: string | null;
  donate?: string | null;
  excess?: string | null;
};

export type SignUpData = {
  __typename: 'SignUpData';
  id: string;
  email: string;
  type: string;
};

export type getAdminPageRequestsQueryVariables = {};

export type getAdminPageRequestsQuery = {
  getLocalAuthorities: Array<{
    __typename: 'LocalAuthority';
    code: string;
    name: string;
    registered: boolean;
  }>;
  getJoinRequests: Array<{
    __typename: 'JoinRequest';
    name: string;
    localAuthority: string;
    type: string;
    requestTime: number;
  }>;
};

export type RegisterLocalAuthorityMutationVariables = {
  name: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  department: string;
  email: string;
  phone: string;
  notes?: string | null;
};

export type RegisterLocalAuthorityMutation = {
  registerLocalAuthority: boolean;
};

export type UpdateSchoolProfileMutationVariables = {
  name: string;
  key: string;
  value: string;
};

export type UpdateSchoolProfileMutation = {
  updateSchoolProfile: boolean;
};

export type UpdateJoinRequestMutationVariables = {
  localAuthority: string;
  name: string;
  status: string;
};

export type UpdateJoinRequestMutation = {
  updateJoinRequest: boolean;
};

export type InsertSignUpDataMutationVariables = {
  id: string;
  email: string;
};

export type InsertSignUpDataMutation = {
  insertSignUpData: boolean;
};

export type GetSchoolByNameQueryVariables = {
  name: string;
};

export type GetSchoolByNameQuery = {
  getSchoolByName: {
    __typename: 'School';
    urn: string;
    name: string;
    localAuthority: string;
    postcode?: string | null;
    registered: boolean;
  };
};

export type GetSchoolsByLaQueryVariables = {
  name: string;
};

export type GetSchoolsByLaQuery = {
  getSchoolsByLa: Array<{
    __typename: 'School';
    urn: string;
    name: string;
    localAuthority: string;
    postcode?: string | null;
    registered: boolean;
  }>;
};

export type GetSchoolsQueryVariables = {};

export type GetSchoolsQuery = {
  getSchools: Array<{
    __typename: 'School';
    urn: string;
    name: string;
    localAuthority: string;
    postcode?: string | null;
    registered: boolean;
  }>;
};

export type GetLocalAuthoritiesQueryVariables = {};

export type GetLocalAuthoritiesQuery = {
  getLocalAuthorities: Array<{
    __typename: 'LocalAuthority';
    code: string;
    name: string;
    registered: boolean;
  }>;
};

export type GetJoinRequestsQueryVariables = {};

export type GetJoinRequestsQuery = {
  getJoinRequests: Array<{
    __typename: 'JoinRequest';
    name: string;
    localAuthority: string;
    type: string;
    requestTime: number;
    status: string;
    email: string;
  }>;
};

export type GetSchoolProfileQueryVariables = {
  name: string;
};

export type GetSchoolProfileQuery = {
  getSchoolProfile: {
    __typename: 'SchoolProfile';
    request?: string | null;
    donate?: string | null;
    excess?: string | null;
  };
};

export type GetSignUpDataQueryVariables = {
  id: string;
};

export type GetSignUpDataQuery = {
  getSignUpData?: {
    __typename: 'SignUpData';
    id: string;
    email: string;
    type: string;
  } | null;
};
