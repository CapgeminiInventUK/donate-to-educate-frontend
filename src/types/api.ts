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
  id: string;
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
  urn?: string | null;
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
  distance?: number | null;
  profile?: Array<SchoolProfile | null> | null;
  hasJoinRequest?: boolean | null;
};

export type SchoolProfile = {
  __typename: 'SchoolProfile';
  name: string;
  id: string;
  localAuthority: string;
  postcode: string;
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
  productTypes?: Array<number | null> | null;
};

export type Charity = {
  __typename: 'Charity';
  id: string;
  localAuthority: string;
  name: string;
  address: string;
  about: string;
  distance?: number | null;
  profile?: Array<CharityProfile | null> | null;
};

export type CharityProfile = {
  __typename: 'CharityProfile';
  name: string;
  id: string;
  localAuthority: string;
  postcode?: string | null;
  header?: CharityProfileHeader | null;
  about?: string | null;
  request?: ProfileItems | null;
  donate?: ProfileItems | null;
  excess?: ProfileItems | null;
};

export type CharityProfileHeader = {
  __typename: 'CharityProfileHeader';
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  address?: string | null;
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
  privacyPolicyAccepted?: boolean | null;
};

export type SignUpData = {
  __typename: 'SignUpData';
  id: string;
  email: string;
  type: string;
  name: string;
  nameId: string;
};

export type AdminStats = {
  __typename: 'AdminStats';
  la: LocalAuthorityStats;
  joinRequests: JoinRequestStats;
  registeredSchools: number;
  registeredCharities: number;
};

export type LocalAuthorityStats = {
  __typename: 'LocalAuthorityStats';
  joined: number;
  notJoined: number;
};

export type JoinRequestStats = {
  __typename: 'JoinRequestStats';
  school: number;
  charity: number;
};

export type LaStats = {
  __typename: 'LaStats';
  schoolRequests: number;
  charityRequests: number;
  privacyPolicyAccepted: boolean;
};

export enum Type {
  donate = 'donate',
  request = 'request',
  excess = 'excess',
}

export type InstituteSearchResult = {
  __typename: 'InstituteSearchResult';
  id: string;
  name: string;
  distance: number;
  productTypes: Array<number>;
  registered: boolean;
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
    id: string;
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
    urn?: string | null;
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

export type UpdateCharityProfileMutationVariables = {
  key: string;
  value: string;
};

export type UpdateCharityProfileMutation = {
  updateCharityProfile: boolean;
};

export type UpdateJoinRequestMutationVariables = {
  id: string;
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
  urn?: string | null;
};

export type InsertJoinRequestMutation = {
  insertJoinRequest: boolean;
};

export type InsertLocalAuthorityRegisterRequestMutationVariables = {
  name: string;
  localAuthority: string;
  email: string;
  message: string;
  type: string;
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
  organisationName: string;
  organisationId: string;
  organisationType: string;
};

export type InsertItemQueryMutation = {
  insertItemQuery: boolean;
};

export type DeleteDeniedJoinRequestMutationVariables = {
  id: string;
};

export type DeleteDeniedJoinRequestMutation = {
  deleteDeniedJoinRequest: boolean;
};

export type DeleteSchoolProfileMutationVariables = {
  name: string;
  id: string;
};

export type DeleteSchoolProfileMutation = {
  deleteSchoolProfile?: boolean | null;
};

export type DeleteCharityProfileMutationVariables = {
  name: string;
  id: string;
};

export type DeleteCharityProfileMutation = {
  deleteCharityProfile?: boolean | null;
};

export type AcceptPrivacyPolicyMutationVariables = {
  name: string;
  nameId: string;
  email: string;
};

export type AcceptPrivacyPolicyMutation = {
  acceptPrivacyPolicy: boolean;
};

export type GetSchoolQueryVariables = {
  name: string;
  urn: string;
};

export type GetSchoolQuery = {
  getSchool: {
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
    distance?: number | null;
    profile?: Array<{
      __typename: 'SchoolProfile';
      name: string;
      id: string;
      localAuthority: string;
      postcode: string;
      about?: string | null;
    } | null> | null;
    hasJoinRequest?: boolean | null;
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
    distance?: number | null;
    profile?: Array<{
      __typename: 'SchoolProfile';
      name: string;
      id: string;
      localAuthority: string;
      postcode: string;
      about?: string | null;
    } | null> | null;
    hasJoinRequest?: boolean | null;
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
    distance?: number | null;
    profile?: Array<{
      __typename: 'SchoolProfile';
      name: string;
      id: string;
      localAuthority: string;
      postcode: string;
      about?: string | null;
    } | null> | null;
    hasJoinRequest?: boolean | null;
  }>;
};

export type GetCharitiesQueryVariables = {};

export type GetCharitiesQuery = {
  getCharities: Array<{
    __typename: 'Charity';
    id: string;
    localAuthority: string;
    name: string;
    address: string;
    about: string;
    distance?: number | null;
    profile?: Array<{
      __typename: 'CharityProfile';
      name: string;
      id: string;
      localAuthority: string;
      postcode?: string | null;
      about?: string | null;
    } | null> | null;
  }>;
};

export type GetCharitiesByLaQueryVariables = {
  name: string;
};

export type GetCharitiesByLaQuery = {
  getCharitiesByLa: Array<{
    __typename: 'Charity';
    id: string;
    localAuthority: string;
    name: string;
    address: string;
    about: string;
    distance?: number | null;
    profile?: Array<{
      __typename: 'CharityProfile';
      name: string;
      id: string;
      localAuthority: string;
      postcode?: string | null;
      about?: string | null;
    } | null> | null;
  } | null>;
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
    distance?: number | null;
    profile?: Array<{
      __typename: 'SchoolProfile';
      name: string;
      id: string;
      localAuthority: string;
      postcode: string;
      about?: string | null;
    } | null> | null;
    hasJoinRequest?: boolean | null;
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
    distance?: number | null;
    profile?: Array<{
      __typename: 'SchoolProfile';
      name: string;
      id: string;
      localAuthority: string;
      postcode: string;
      about?: string | null;
    } | null> | null;
    hasJoinRequest?: boolean | null;
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
    id: string;
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
    urn?: string | null;
  }>;
};

export type GetSchoolProfileQueryVariables = {
  name: string;
  id: string;
};

export type GetSchoolProfileQuery = {
  getSchoolProfile?: {
    __typename: 'SchoolProfile';
    name: string;
    id: string;
    localAuthority: string;
    postcode: string;
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
      productTypes?: Array<number | null> | null;
    } | null;
    donate?: {
      __typename: 'ProfileItems';
      items?: string | null;
      whatToExpect?: string | null;
      actionText?: string | null;
      productTypes?: Array<number | null> | null;
    } | null;
    excess?: {
      __typename: 'ProfileItems';
      items?: string | null;
      whatToExpect?: string | null;
      actionText?: string | null;
      productTypes?: Array<number | null> | null;
    } | null;
  } | null;
};

export type GetCharityProfileQueryVariables = {
  name: string;
  id: string;
};

export type GetCharityProfileQuery = {
  getCharityProfile?: {
    __typename: 'CharityProfile';
    name: string;
    id: string;
    localAuthority: string;
    postcode?: string | null;
    header?: {
      __typename: 'CharityProfileHeader';
      phone?: string | null;
      email?: string | null;
      website?: string | null;
      address?: string | null;
    } | null;
    about?: string | null;
    request?: {
      __typename: 'ProfileItems';
      items?: string | null;
      whatToExpect?: string | null;
      actionText?: string | null;
      productTypes?: Array<number | null> | null;
    } | null;
    donate?: {
      __typename: 'ProfileItems';
      items?: string | null;
      whatToExpect?: string | null;
      actionText?: string | null;
      productTypes?: Array<number | null> | null;
    } | null;
    excess?: {
      __typename: 'ProfileItems';
      items?: string | null;
      whatToExpect?: string | null;
      actionText?: string | null;
      productTypes?: Array<number | null> | null;
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
    privacyPolicyAccepted?: boolean | null;
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
    distance?: number | null;
    profile?: Array<{
      __typename: 'SchoolProfile';
      name: string;
      id: string;
      localAuthority: string;
      postcode: string;
      about?: string | null;
    } | null> | null;
    hasJoinRequest?: boolean | null;
  }>;
};

export type GetCharitiesNearbyQueryVariables = {
  postcode: string;
  distance: number;
};

export type GetCharitiesNearbyQuery = {
  getCharitiesNearby: Array<{
    __typename: 'Charity';
    id: string;
    localAuthority: string;
    name: string;
    address: string;
    about: string;
    distance?: number | null;
    profile?: Array<{
      __typename: 'CharityProfile';
      name: string;
      id: string;
      localAuthority: string;
      postcode?: string | null;
      about?: string | null;
    } | null> | null;
  }>;
};

export type GetSchoolJoinRequestsByLaQueryVariables = {
  localAuthority: string;
};

export type GetSchoolJoinRequestsByLaQuery = {
  getSchoolJoinRequestsByLa: Array<{
    __typename: 'JoinRequest';
    id: string;
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
    urn?: string | null;
  }>;
};

export type GetCharityJoinRequestsByLaQueryVariables = {
  localAuthority: string;
};

export type GetCharityJoinRequestsByLaQuery = {
  getCharityJoinRequestsByLa: Array<{
    __typename: 'JoinRequest';
    id: string;
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
    urn?: string | null;
  }>;
};

export type GetAdminTileStatsQueryVariables = {};

export type GetAdminTileStatsQuery = {
  getAdminTileStats: {
    __typename: 'AdminStats';
    la: {
      __typename: 'LocalAuthorityStats';
      joined: number;
      notJoined: number;
    };
    joinRequests: {
      __typename: 'JoinRequestStats';
      school: number;
      charity: number;
    };
    registeredSchools: number;
    registeredCharities: number;
  };
};

export type GetLaStatsQueryVariables = {
  name: string;
  nameId: string;
  email: string;
};

export type GetLaStatsQuery = {
  getLaStats: {
    __typename: 'LaStats';
    schoolRequests: number;
    charityRequests: number;
    privacyPolicyAccepted: boolean;
  };
};

export type GetSchoolsNearbyWithProfileQueryVariables = {
  postcode: string;
  distance: number;
  type: Type;
};

export type GetSchoolsNearbyWithProfileQuery = {
  getSchoolsNearbyWithProfile: Array<{
    __typename: 'InstituteSearchResult';
    id: string;
    name: string;
    distance: number;
    productTypes: Array<number>;
    registered: boolean;
  }>;
};

export type GetCharitiesNearbyWithProfileQueryVariables = {
  postcode: string;
  distance: number;
  type: Type;
};

export type GetCharitiesNearbyWithProfileQuery = {
  getCharitiesNearbyWithProfile: Array<{
    __typename: 'InstituteSearchResult';
    id: string;
    name: string;
    distance: number;
    productTypes: Array<number>;
    registered: boolean;
  }>;
};

export type HasSchoolProfileQueryVariables = {
  name: string;
  id: string;
};

export type HasSchoolProfileQuery = {
  hasSchoolProfile: boolean;
};

export type HasCharityProfileQueryVariables = {
  name: string;
  id: string;
};

export type HasCharityProfileQuery = {
  hasCharityProfile: boolean;
};
