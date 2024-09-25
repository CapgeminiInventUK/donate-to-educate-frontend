/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type LocalAuthority = {
  __typename: 'LocalAuthority';
  code: string;
  name: string;
  registered: boolean;
  registeredSchools?: number | null;
  registeredCharities?: number | null;
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
  postcode?: string | null;
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
  registrationState?: string | null;
  request?: ProfileItems | null;
  donate?: ProfileItems | null;
  excess?: ProfileItems | null;
};

export type SchoolProfile = {
  __typename: 'SchoolProfile';
  name: string;
  id: string;
  localAuthority: string;
  postcode: string;
  location?: Point | null;
  header?: SchoolProfileHeader | null;
  about?: string | null;
  request?: ProfileItems | null;
  donate?: ProfileItems | null;
  excess?: ProfileItems | null;
};

export type Point = {
  __typename: 'Point';
  type: string;
  coordinates: Array<number>;
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
  postcode?: string | null;
  request?: ProfileItems | null;
  donate?: ProfileItems | null;
  excess?: ProfileItems | null;
};

export type CharityProfile = {
  __typename: 'CharityProfile';
  name: string;
  id: string;
  localAuthority: string;
  postcode?: string | null;
  location?: Point | null;
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

export type SchoolUser = {
  __typename: 'SchoolUser';
  name: string;
  schoolName: string;
  schoolId: string;
  jobTitle: string;
  email: string;
  phone: string;
};

export type CharityUser = {
  __typename: 'CharityUser';
  name: string;
  charityName: string;
  charityId: string;
  jobTitle: string;
  email: string;
  phone: string;
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
  searchLocation: Point;
  results: Array<SearchResult>;
};

export type SearchResult = {
  __typename: 'SearchResult';
  id: string;
  name: string;
  distance: number;
  productTypes: Array<number>;
  registered: boolean;
  location: Point;
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
  postcode?: string | null;
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

export type DeleteSignUpDataMutationVariables = {
  id: string;
  email: string;
};

export type DeleteSignUpDataMutation = {
  deleteSignUpData?: boolean | null;
};

export type UpdateUserMutationVariables = {
  userType: string;
  name: string;
  id: string;
  institutionName: string;
  email: string;
  phone: string;
  jobTitle: string;
  department?: string | null;
};

export type UpdateUserMutation = {
  updateUser?: boolean | null;
};

export type DeleteUserProfileMutationVariables = {
  userType: string;
  name: string;
  id: string;
  email: string;
};

export type DeleteUserProfileMutation = {
  deleteUserProfile?: boolean | null;
};

export type AddAdditionalUserMutationVariables = {
  id: string;
  name: string;
  localAuthority: string;
  type: string;
  email: string;
  school?: string | null;
  jobTitle: string;
  phone?: string | null;
  charityName?: string | null;
  urn?: string | null;
  department?: string | null;
  addedBy: string;
};

export type AddAdditionalUserMutation = {
  addAdditionalUser?: boolean | null;
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
      location?: {
        __typename: 'Point';
        type: string;
        coordinates: Array<number>;
      } | null;
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
    } | null> | null;
    hasJoinRequest?: boolean | null;
    registrationState?: string | null;
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
      location?: {
        __typename: 'Point';
        type: string;
        coordinates: Array<number>;
      } | null;
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
    } | null> | null;
    hasJoinRequest?: boolean | null;
    registrationState?: string | null;
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
      location?: {
        __typename: 'Point';
        type: string;
        coordinates: Array<number>;
      } | null;
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
    } | null> | null;
    hasJoinRequest?: boolean | null;
    registrationState?: string | null;
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
      location?: {
        __typename: 'Point';
        type: string;
        coordinates: Array<number>;
      } | null;
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
    } | null> | null;
    postcode?: string | null;
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
      location?: {
        __typename: 'Point';
        type: string;
        coordinates: Array<number>;
      } | null;
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
    } | null> | null;
    postcode?: string | null;
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
      location?: {
        __typename: 'Point';
        type: string;
        coordinates: Array<number>;
      } | null;
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
    } | null> | null;
    hasJoinRequest?: boolean | null;
    registrationState?: string | null;
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
      location?: {
        __typename: 'Point';
        type: string;
        coordinates: Array<number>;
      } | null;
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
    } | null> | null;
    hasJoinRequest?: boolean | null;
    registrationState?: string | null;
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
  }>;
};

export type GetLocalAuthoritiesQueryVariables = {};

export type GetLocalAuthoritiesQuery = {
  getLocalAuthorities: Array<{
    __typename: 'LocalAuthority';
    code: string;
    name: string;
    registered: boolean;
    registeredSchools?: number | null;
    registeredCharities?: number | null;
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
    postcode?: string | null;
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
    location?: {
      __typename: 'Point';
      type: string;
      coordinates: Array<number>;
    } | null;
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
    location?: {
      __typename: 'Point';
      type: string;
      coordinates: Array<number>;
    } | null;
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

export type GetLocalAuthorityUsersQueryVariables = {
  id: string;
};

export type GetLocalAuthorityUsersQuery = {
  getLocalAuthorityUsers: Array<{
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
  } | null>;
};

export type GetSchoolUserQueryVariables = {
  email: string;
};

export type GetSchoolUserQuery = {
  getSchoolUser: {
    __typename: 'SchoolUser';
    name: string;
    schoolName: string;
    schoolId: string;
    jobTitle: string;
    email: string;
    phone: string;
  };
};

export type GetSchoolUsersQueryVariables = {
  id: string;
};

export type GetSchoolUsersQuery = {
  getSchoolUsers: Array<{
    __typename: 'SchoolUser';
    name: string;
    schoolName: string;
    schoolId: string;
    jobTitle: string;
    email: string;
    phone: string;
  } | null>;
};

export type GetCharityUserQueryVariables = {
  email: string;
};

export type GetCharityUserQuery = {
  getCharityUser: {
    __typename: 'CharityUser';
    name: string;
    charityName: string;
    charityId: string;
    jobTitle: string;
    email: string;
    phone: string;
  };
};

export type GetCharityUsersQueryVariables = {
  id: string;
};

export type GetCharityUsersQuery = {
  getCharityUsers: Array<{
    __typename: 'CharityUser';
    name: string;
    charityName: string;
    charityId: string;
    jobTitle: string;
    email: string;
    phone: string;
  } | null>;
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
      location?: {
        __typename: 'Point';
        type: string;
        coordinates: Array<number>;
      } | null;
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
    } | null> | null;
    hasJoinRequest?: boolean | null;
    registrationState?: string | null;
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
      location?: {
        __typename: 'Point';
        type: string;
        coordinates: Array<number>;
      } | null;
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
    } | null> | null;
    postcode?: string | null;
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
    postcode?: string | null;
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
    postcode?: string | null;
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
  limit: number;
  type: Type;
};

export type GetSchoolsNearbyWithProfileQuery = {
  getSchoolsNearbyWithProfile: {
    __typename: 'InstituteSearchResult';
    searchLocation: {
      __typename: 'Point';
      type: string;
      coordinates: Array<number>;
    };
    results: Array<{
      __typename: 'SearchResult';
      id: string;
      name: string;
      distance: number;
      productTypes: Array<number>;
      registered: boolean;
      location: {
        __typename: 'Point';
        type: string;
        coordinates: Array<number>;
      };
    }>;
  };
};

export type GetCharitiesNearbyWithProfileQueryVariables = {
  postcode: string;
  distance: number;
  limit: number;
  type: Type;
};

export type GetCharitiesNearbyWithProfileQuery = {
  getCharitiesNearbyWithProfile: {
    __typename: 'InstituteSearchResult';
    searchLocation: {
      __typename: 'Point';
      type: string;
      coordinates: Array<number>;
    };
    results: Array<{
      __typename: 'SearchResult';
      id: string;
      name: string;
      distance: number;
      productTypes: Array<number>;
      registered: boolean;
      location: {
        __typename: 'Point';
        type: string;
        coordinates: Array<number>;
      };
    }>;
  };
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
