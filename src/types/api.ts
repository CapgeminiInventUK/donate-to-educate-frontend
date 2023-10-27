/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type School = {
  __typename: 'School';
  urn: string;
  name: string;
  localAuthority: string;
  postcode: string;
  registered: boolean;
};

export type GetSchoolByNameQueryVariables = {
  name: string;
};

export type GetSchoolByNameQuery = {
  getSchoolByName?: {
    __typename: 'School';
    urn: string;
    name: string;
    localAuthority: string;
    postcode: string;
    registered: boolean;
  } | null;
};
