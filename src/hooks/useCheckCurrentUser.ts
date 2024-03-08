import {
  AuthUser,
  FetchUserAttributesOutput,
  fetchUserAttributes,
  getCurrentUser,
} from 'aws-amplify/auth';
import { useEffect, useState } from 'react';

export const checkAuthState = async (): Promise<AuthUser> => {
  return await getCurrentUser();
};

export const getUserType = async (): Promise<FetchUserAttributesOutput & CustomAttributes> => {
  return (await fetchUserAttributes()) as FetchUserAttributesOutput & CustomAttributes;
};

export interface CustomAttributes {
  'custom:type': string;
  'custom:institution': string;
  'custom:institutionId': string;
}

export type AccountType = 'admin' | 'charity' | 'school' | 'localAuthority';
export type User = AuthUser & CustomAttributes;

export const useCheckCurrentUser = (): {
  user?: User;
  isLoading: boolean;
  error?: string;
} => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (isLoading) {
      checkAuthState()
        .then((user) => {
          getUserType()
            .then((attributes) => {
              setUser({ ...user, ...attributes });
              setIsLoading(() => false);
            })
            .catch((error: Error) => {
              setError(error.toString());
              setIsLoading(() => false);
            });
        })
        .catch((error: Error) => {
          setError(error.toString());
          setIsLoading(() => false);
        });
    }
  }, [isLoading]);

  return { isLoading, user, error };
};
