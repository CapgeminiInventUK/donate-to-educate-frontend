/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../types/api";
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
  $nameId: String!
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
    nameId: $nameId
  )
}
` as GeneratedMutation<
  APITypes.RegisterLocalAuthorityMutationVariables,
  APITypes.RegisterLocalAuthorityMutation
>;
export const updateSchoolProfile = /* GraphQL */ `mutation UpdateSchoolProfile($key: String!, $value: String!) {
  updateSchoolProfile(key: $key, value: $value)
}
` as GeneratedMutation<
  APITypes.UpdateSchoolProfileMutationVariables,
  APITypes.UpdateSchoolProfileMutation
>;
export const updateCharityProfile = /* GraphQL */ `mutation UpdateCharityProfile($key: String!, $value: String!) {
  updateCharityProfile(key: $key, value: $value)
}
` as GeneratedMutation<
  APITypes.UpdateCharityProfileMutationVariables,
  APITypes.UpdateCharityProfileMutation
>;
export const updateJoinRequest = /* GraphQL */ `mutation UpdateJoinRequest(
  $id: String!
  $localAuthority: String!
  $name: String!
  $status: String!
) {
  updateJoinRequest(
    id: $id
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
  $email: String!
  $school: String
  $jobTitle: String
  $phone: String
  $charityName: String
  $charityAddress: String
  $aboutCharity: String
  $urn: String
  $postcode: String
) {
  insertJoinRequest(
    name: $name
    localAuthority: $localAuthority
    type: $type
    email: $email
    school: $school
    jobTitle: $jobTitle
    phone: $phone
    charityName: $charityName
    charityAddress: $charityAddress
    aboutCharity: $aboutCharity
    urn: $urn
    postcode: $postcode
  )
}
` as GeneratedMutation<
  APITypes.InsertJoinRequestMutationVariables,
  APITypes.InsertJoinRequestMutation
>;
export const insertLocalAuthorityRegisterRequest = /* GraphQL */ `mutation InsertLocalAuthorityRegisterRequest(
  $name: String!
  $localAuthority: String!
  $email: String!
  $message: String!
  $type: String!
) {
  insertLocalAuthorityRegisterRequest(
    name: $name
    localAuthority: $localAuthority
    email: $email
    message: $message
    type: $type
  )
}
` as GeneratedMutation<
  APITypes.InsertLocalAuthorityRegisterRequestMutationVariables,
  APITypes.InsertLocalAuthorityRegisterRequestMutation
>;
export const insertSignUpData = /* GraphQL */ `mutation InsertSignUpData(
  $id: String!
  $email: String!
  $type: String!
  $name: String!
  $nameId: String!
) {
  insertSignUpData(
    id: $id
    email: $email
    type: $type
    name: $name
    nameId: $nameId
  )
}
` as GeneratedMutation<
  APITypes.InsertSignUpDataMutationVariables,
  APITypes.InsertSignUpDataMutation
>;
export const insertItemQuery = /* GraphQL */ `mutation InsertItemQuery(
  $name: String!
  $email: String!
  $type: String!
  $message: String!
  $who: String!
  $phone: String!
  $connection: String
  $organisationName: String!
  $organisationId: String!
  $organisationType: String!
) {
  insertItemQuery(
    name: $name
    email: $email
    type: $type
    message: $message
    who: $who
    phone: $phone
    connection: $connection
    organisationName: $organisationName
    organisationId: $organisationId
    organisationType: $organisationType
  )
}
` as GeneratedMutation<
  APITypes.InsertItemQueryMutationVariables,
  APITypes.InsertItemQueryMutation
>;
export const deleteDeniedJoinRequest = /* GraphQL */ `mutation DeleteDeniedJoinRequest($id: String!) {
  deleteDeniedJoinRequest(id: $id)
}
` as GeneratedMutation<
  APITypes.DeleteDeniedJoinRequestMutationVariables,
  APITypes.DeleteDeniedJoinRequestMutation
>;
export const deleteSchoolProfile = /* GraphQL */ `mutation DeleteSchoolProfile($name: String!, $id: String!) {
  deleteSchoolProfile(name: $name, id: $id)
}
` as GeneratedMutation<
  APITypes.DeleteSchoolProfileMutationVariables,
  APITypes.DeleteSchoolProfileMutation
>;
export const deleteCharityProfile = /* GraphQL */ `mutation DeleteCharityProfile($name: String!, $id: String!) {
  deleteCharityProfile(name: $name, id: $id)
}
` as GeneratedMutation<
  APITypes.DeleteCharityProfileMutationVariables,
  APITypes.DeleteCharityProfileMutation
>;
export const acceptPrivacyPolicy = /* GraphQL */ `mutation AcceptPrivacyPolicy(
  $name: String!
  $nameId: String!
  $email: String!
) {
  acceptPrivacyPolicy(name: $name, nameId: $nameId, email: $email)
}
` as GeneratedMutation<
  APITypes.AcceptPrivacyPolicyMutationVariables,
  APITypes.AcceptPrivacyPolicyMutation
>;
