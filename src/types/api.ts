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
  school?: string | null;
  jobTitle?: string | null;
  phone?: string | null;
  charityName?: string | null;
  charityAddress?: string | null;
  aboutCharity?: string | null;
};

export type School = {
  __typename: 'School';
  urn: string;
  name: string;
  localAuthority: string;
  postcode?: string | null;
  registered: boolean;
  isLocalAuthorityRegistered?: boolean | null;
  address3?: string | null;
  county?: string | null;
  locality?: string | null;
  street?: string | null;
  phone?: string | null;
  town?: string | null;
  website?: string | null;
  distance?: string | null;
};

export type SchoolProfile = {
  __typename: 'SchoolProfile';
  request?: ProfileItems | null;
  donate?: ProfileItems | null;
  excess?: ProfileItems | null;
};

export type ProfileItems = {
  __typename: 'ProfileItems';
  items: string;
  banner: string;
  helpBannerTitle: string;
  helpBannerBody: string;
  whatToExpect: string;
  actionText: string;
};

export type LocalAuthorityUser = {
  __typename: 'LocalAuthorityUser';
  name: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  department: string;
  email: string;
  phone: string;
  notes?: string | null;
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
    status: string;
    email: string;
    school?: string | null;
    jobTitle?: string | null;
    phone?: string | null;
    charityName?: string | null;
    charityAddress?: string | null;
    aboutCharity?: string | null;
  }>;
};

export type getSchoolsAndLocalAuthoritiesQueryVariables = {};

export type getSchoolsAndLocalAuthoritiesQuery = {
  getLocalAuthorities: Array<{
    __typename: 'LocalAuthority';
    code: string;
    name: string;
    registered: boolean;
  }>;
  getSchools: Array<{
    __typename: 'School';
    urn: string;
    name: string;
    localAuthority: string;
    postcode?: string | null;
    registered: boolean;
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

export type InsertJoinRequestMutationVariables = {
  name: string;
  localAuthority: string;
  type: string;
  email: string;
  school?: string | null;
  jobTitle?: string | null;
  phone?: string | null;
  charityName?: string | null;
  charityAddress?: string | null;
  aboutCharity?: string | null;
};

export type InsertJoinRequestMutation = {
  insertJoinRequest: boolean;
};

export type InsertLocalAuthorityRegisterRequestMutationVariables = {
  name: string;
  email: string;
  message: string;
};

export type InsertLocalAuthorityRegisterRequestMutation = {
  insertLocalAuthorityRegisterRequest: boolean;
};

export type InsertSignUpDataMutationVariables = {
  id: string;
  email: string;
  type: string;
};

export type InsertSignUpDataMutation = {
  insertSignUpData: boolean;
};

export type InsertItemQueryMutationVariables = {
  name: string;
  email: string;
  type: string;
  message: string;
  who: string;
  phone: string;
  connection?: string | null;
};

export type InsertItemQueryMutation = {
  insertItemQuery: boolean;
};

export type DeleteDeniedJoinRequestMutationVariables = {
  name: string;
};

export type DeleteDeniedJoinRequestMutation = {
  deleteDeniedJoinRequest: boolean;
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
    isLocalAuthorityRegistered?: boolean | null;
    address3?: string | null;
    county?: string | null;
    locality?: string | null;
    street?: string | null;
    phone?: string | null;
    town?: string | null;
    website?: string | null;
    distance?: string | null;
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
    isLocalAuthorityRegistered?: boolean | null;
    address3?: string | null;
    county?: string | null;
    locality?: string | null;
    street?: string | null;
    phone?: string | null;
    town?: string | null;
    website?: string | null;
    distance?: string | null;
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
    isLocalAuthorityRegistered?: boolean | null;
    address3?: string | null;
    county?: string | null;
    locality?: string | null;
    street?: string | null;
    phone?: string | null;
    town?: string | null;
    website?: string | null;
    distance?: string | null;
  }>;
};

export type GetRegisteredSchoolsQueryVariables = {};

export type GetRegisteredSchoolsQuery = {
  getRegisteredSchools: Array<{
    __typename: 'School';
    urn: string;
    name: string;
    localAuthority: string;
    postcode?: string | null;
    registered: boolean;
    isLocalAuthorityRegistered?: boolean | null;
    address3?: string | null;
    county?: string | null;
    locality?: string | null;
    street?: string | null;
    phone?: string | null;
    town?: string | null;
    website?: string | null;
    distance?: string | null;
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
    school?: string | null;
    jobTitle?: string | null;
    phone?: string | null;
    charityName?: string | null;
    charityAddress?: string | null;
    aboutCharity?: string | null;
  }>;
};

export type GetSchoolProfileQueryVariables = {
  name: string;
};

export type GetSchoolProfileQuery = {
  getSchoolProfile: {
    __typename: 'SchoolProfile';
    request?: {
      __typename: 'ProfileItems';
      items: string;
      banner: string;
      helpBannerTitle: string;
      helpBannerBody: string;
      whatToExpect: string;
      actionText: string;
    } | null;
    donate?: {
      __typename: 'ProfileItems';
      items: string;
      banner: string;
      helpBannerTitle: string;
      helpBannerBody: string;
      whatToExpect: string;
      actionText: string;
    } | null;
    excess?: {
      __typename: 'ProfileItems';
      items: string;
      banner: string;
      helpBannerTitle: string;
      helpBannerBody: string;
      whatToExpect: string;
      actionText: string;
    } | null;
  };
};

export type GetLocalAuthorityUserQueryVariables = {
  email: string;
};

export type GetLocalAuthorityUserQuery = {
  getLocalAuthorityUser: {
    __typename: 'LocalAuthorityUser';
    name: string;
    firstName: string;
    lastName: string;
    jobTitle: string;
    department: string;
    email: string;
    phone: string;
    notes?: string | null;
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

export type GetSchoolsNearbyQueryVariables = {};

export type GetSchoolsNearbyQuery = {
  getSchoolsNearby?: Array<{
    __typename: 'School';
    urn: string;
    name: string;
    localAuthority: string;
    postcode?: string | null;
    registered: boolean;
    isLocalAuthorityRegistered?: boolean | null;
    address3?: string | null;
    county?: string | null;
    locality?: string | null;
    street?: string | null;
    phone?: string | null;
    town?: string | null;
    website?: string | null;
    distance?: string | null;
  } | null> | null;
};
