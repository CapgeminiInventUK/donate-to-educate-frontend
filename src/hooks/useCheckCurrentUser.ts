import { getCurrentUser } from 'aws-amplify/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export const useCheckCurrentUser = (route = '/login'): boolean => {
  const navigate = useNavigate();
  const [checkIsLoggedIn, setCheckIsLoggedIn] = useState(false);

  async function checkAuthState(): Promise<void> {
    try {
      await getCurrentUser();
      setCheckIsLoggedIn(true);
    } catch (err) {
      navigate(route);
    }
  }
  useEffect(() => {
    void checkAuthState();
  });

  return checkIsLoggedIn;
};
