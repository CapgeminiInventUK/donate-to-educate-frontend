import { fetchAuthSession } from 'aws-amplify/auth';
import { useEffect, useState } from 'react';

const useGetAuthToken = (): string | undefined => {
  const [authToken, setAuthToken] = useState<string>();

  useEffect(() => {
    fetchAuthSession()
      .then((session) => setAuthToken(session.tokens?.idToken?.toString()))
      // eslint-disable-next-line no-console
      .catch(console.log);
  });

  return authToken;
};

export default useGetAuthToken;
