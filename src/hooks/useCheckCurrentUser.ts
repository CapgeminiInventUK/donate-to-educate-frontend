import { getCurrentUser } from 'aws-amplify/auth';
import { useEffect, useState } from 'react';

async function checkAuthState(): Promise<void> {
  await getCurrentUser();
}

export const useCheckCurrentUser = (): boolean => {
  const [checkIsLoggedIn, setCheckIsLoggedIn] = useState(false);

  useEffect(() => {
    checkAuthState()
      .then(() => setCheckIsLoggedIn(true))
      .catch(() => setCheckIsLoggedIn(false));
  });

  return checkIsLoggedIn;
};
