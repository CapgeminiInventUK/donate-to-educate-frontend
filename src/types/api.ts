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
  header?: SchoolProfileHeader | null;
  about?: string | null;
  request?: ProfileItems | null;
  donate?: ProfileItems | null;
  excess?: ProfileItems | null;
};

export type SchoolProfileHeader = {
  __typename: 'SchoolProfileHeader';
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  uniformPolicy?: string | null;
};

export type ProfileItems = {
  __typename: 'ProfileItems';
  items?: string | null;
  whatToExpect?: string | null;
  actionText?: string | null;
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
  nameId: string;
};

export type SignUpData = {
  __typename: 'SignUpData';
  id: string;
  email: string;
  type: string;
  name: string;
  nameId: string;
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
  nameId: string;
};

export type RegisterLocalAuthorityMutation = {
  registerLocalAuthority: boolean;
};

export type UpdateSchoolProfileMutationVariables = {
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
  localAuthority: string;
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
  name: string;
  nameId: string;
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
  organisationType: string;
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

export type GetRegisteredSchoolsByLaQueryVariables = {
  localAuthority: string;
};

export type GetRegisteredSchoolsByLaQuery = {
  getRegisteredSchoolsByLa: Array<{
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
  id: string;
};

export type GetSchoolProfileQuery = {
  getSchoolProfile?: {
    __typename: 'SchoolProfile';
    header?: {
      __typename: 'SchoolProfileHeader';
      phone?: string | null;
      email?: string | null;
      website?: string | null;
      uniformPolicy?: string | null;
    } | null;
    about?: string | null;
    request?: {
      __typename: 'ProfileItems';
      items?: string | null;
      whatToExpect?: string | null;
      actionText?: string | null;
    } | null;
    donate?: {
      __typename: 'ProfileItems';
      items?: string | null;
      whatToExpect?: string | null;
      actionText?: string | null;
    } | null;
    excess?: {
      __typename: 'ProfileItems';
      items?: string | null;
      whatToExpect?: string | null;
      actionText?: string | null;
    } | null;
  } | null;
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
    nameId: string;
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
    name: string;
    nameId: string;
  } | null;
};

export type GetSchoolsNearbyQueryVariables = {
  postcode: string;
  distance: number;
};

export type GetSchoolsNearbyQuery = {
  getSchoolsNearby: Array<{
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

export type GetSchoolJoinRequestsByLaQueryVariables = {
  localAuthority: string;
};

export type GetSchoolJoinRequestsByLaQuery = {
  getSchoolJoinRequestsByLa: Array<{
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
