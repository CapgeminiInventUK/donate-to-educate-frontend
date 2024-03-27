import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export interface LocationStateOrRedirect<T> {
  state: T;
  hasState: boolean;
}

const useLocationStateOrRedirect = <T,>(redirect?: string): LocationStateOrRedirect<T> => {
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
