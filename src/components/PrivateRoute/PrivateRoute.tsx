import { FC, ReactNode, useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router';

interface Props {
  route: string;
  children: ReactNode;
}
const PrivateRoute: FC<Props> = ({ route, children }) => {
  const navigate = useNavigate();
  const [checkIsLoggedIn, setCheckIsLoggedIn] = useState(false);

  async function checkAuthState(): Promise<void> {
    try {
      await Auth.currentAuthenticatedUser();
      setCheckIsLoggedIn(true);
    } catch (err) {
      navigate(route);
    }
  }
  useEffect(() => {
    void checkAuthState();
  });

  // TODO display loader
  if (!checkIsLoggedIn) {
    return <></>;
  }

  return children;
};

export default PrivateRoute;
