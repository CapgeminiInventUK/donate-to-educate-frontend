import { fetchAuthSession } from 'aws-amplify/auth';
import { useEffect, useState } from 'react';

const useGetAuthToken = (): string | undefined => {
  const [authToken, setAuthToken] = useState<string>();

  useEffect(() => {
    void fetchAuthSession().then((session) => setAuthToken(session.tokens?.idToken?.toString()));
  });

  return authToken;
};

export default useGetAuthToken;
