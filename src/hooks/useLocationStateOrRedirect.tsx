import { LocationStateOrRedirectProps } from '@/types/props';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useLocationStateOrRedirect = <T,>(redirect?: string): LocationStateOrRedirectProps<T> => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location?.state && redirect) {
      return navigate(redirect);
    }
  }, [location, navigate, redirect]);

  return { state: location.state as T, hasState: !!location.state };
};

export default useLocationStateOrRedirect;
