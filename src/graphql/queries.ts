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
    __typename
  }
}
` as GeneratedQuery<APITypes.GetSchoolByNameQueryVariables, APITypes.GetSchoolByNameQuery>;
