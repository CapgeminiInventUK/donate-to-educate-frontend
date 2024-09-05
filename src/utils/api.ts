import { GraphQLQuery } from 'aws-amplify/api';

export const getDataValuesFromQueryObject = <T>(data?: GraphQLQuery<T>): T | undefined => {
  return data && (Object.values(data).map((value) => value)[0] as T);
};
