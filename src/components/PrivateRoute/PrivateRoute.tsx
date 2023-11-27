import { FC, ReactNode, useState } from 'react';
import { useCheckCurrentUser } from '@/hooks/useCheckCurrentUser';
import { Navigate } from 'react-router';

interface Props {
  route: string;
  children: ReactNode;
}
const PrivateRoute: FC<Props> = ({ route, children }) => {
  const [lastCheck, setLastCheck] = useState<boolean>();
  const checkIsLoggedIn = useCheckCurrentUser();

  // // TODO display loader
  if (!checkIsLoggedIn && checkIsLoggedIn !== lastCheck) {
    setLastCheck(checkIsLoggedIn);
    return <Navigate to={route} />;
  }

  return children;
};

export default PrivateRoute;
