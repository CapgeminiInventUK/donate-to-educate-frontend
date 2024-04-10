import { useStore } from '@/stores/useStore';
import { useEffect, useState } from 'react';

const useAuthToken = (): { token?: string; error?: Error } => {
  const [token, setToken] = useState<string>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    useStore
      .getState()
      .getToken()
      .then((token) => setToken(token))
      .catch((err) => setError(err as Error));
  }, []);

  return { token, error };
};

export default useAuthToken;
