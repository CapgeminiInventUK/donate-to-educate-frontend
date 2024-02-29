/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from '../types/api';
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const registerLocalAuthority = /* GraphQL */ `mutation RegisterLocalAuthority(
  $name: String!
  $firstName: String!
  $lastName: String!
  $jobTitle: String!
  $department: String!
  $email: String!
  $phone: String!
  $notes: String
) {
  registerLocalAuthority(
    name: $name
    firstName: $firstName
    lastName: $lastName
    jobTitle: $jobTitle
    department: $department
    email: $email
    phone: $phone
    notes: $notes
  )
}
` as GeneratedMutation<
  APITypes.RegisterLocalAuthorityMutationVariables,
  APITypes.RegisterLocalAuthorityMutation
>;
export const updateSchoolProfile =
  /* GraphQL */ `mutation UpdateSchoolProfile($name: String!, $key: String!, $value: String!) {
  updateSchoolProfile(name: $name, key: $key, value: $value)
}
` as GeneratedMutation<
    APITypes.UpdateSchoolProfileMutationVariables,
    APITypes.UpdateSchoolProfileMutation
  >;
export const updateJoinRequest = /* GraphQL */ `mutation UpdateJoinRequest(
  $localAuthority: String!
  $name: String!
  $status: String!
) {
  updateJoinRequest(
    localAuthority: $localAuthority
    name: $name
    status: $status
  )
}
` as GeneratedMutation<
  APITypes.UpdateJoinRequestMutationVariables,
  APITypes.UpdateJoinRequestMutation
>;
export const insertJoinRequest = /* GraphQL */ `mutation InsertJoinRequest(
  $name: String!
  $localAuthority: String!
  $type: String!
  $requestTime: Float!
  $status: String!
  $email: String!
  $school: String
  $jobTitle: String
  $phone: String
  $charityName: String
  $charityAddress: String
  $aboutCharity: String
) {
  insertJoinRequest(
    name: $name
    localAuthority: $localAuthority
    type: $type
    requestTime: $requestTime
    status: $status
    email: $email
    school: $school
    jobTitle: $jobTitle
    phone: $phone
    charityName: $charityName
    charityAddress: $charityAddress
    aboutCharity: $aboutCharity
  )
}
` as GeneratedMutation<
  APITypes.InsertJoinRequestMutationVariables,
  APITypes.InsertJoinRequestMutation
>;
export const insertSignUpData =
  /* GraphQL */ `mutation InsertSignUpData($id: String!, $email: String!, $type: String!) {
  insertSignUpData(id: $id, email: $email, type: $type)
}
` as GeneratedMutation<
    APITypes.InsertSignUpDataMutationVariables,
    APITypes.InsertSignUpDataMutation
  >;
