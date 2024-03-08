import {
  AuthUser,
  getCurrentUser,
  fetchUserAttributes,
  FetchUserAttributesOutput,
} from 'aws-amplify/auth';
import { useEffect, useState } from 'react';

async function checkAuthState(): Promise<AuthUser> {
  return await getCurrentUser();
}

async function getUserType(): Promise<FetchUserAttributesOutput & { 'custom:type': string }> {
  return (await fetchUserAttributes()) as FetchUserAttributesOutput & { 'custom:type': string };
}

export type AccountType = 'admin' | 'charity' | 'school' | 'localAuthority';

export interface CheckCurrentUserReturn {
  user?: AuthUser;
  isLoggedIn: boolean;
  type?: AccountType;
}

export const useCheckCurrentUser = (): CheckCurrentUserReturn => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<AuthUser>();
  const [type, setType] = useState<AccountType>();

  useEffect(() => {
    if (!isLoggedIn) {
      checkAuthState()
        .then((user) => {
          setUser(user);
          setIsLoggedIn(true);
        })

        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error);
          setIsLoggedIn(false);
        });
    }
  });

  useEffect(() => {
    if (isLoggedIn) {
      getUserType()
        .then((attributes) => {
          // eslint-disable-next-line no-console
          console.log(attributes);
          setType(attributes['custom:type'] as AccountType);
        })
        // eslint-disable-next-line no-console
        .catch(console.error);
    }
  }, [isLoggedIn]);

  return { user, isLoggedIn, type };
};
