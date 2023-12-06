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