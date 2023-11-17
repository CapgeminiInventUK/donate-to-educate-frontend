import { FC, ReactNode } from 'react';
import { useCheckCurrentUser } from '@/hooks/useCheckCurrentUser';

interface Props {
  route: string;
  children: ReactNode;
}
const PrivateRoute: FC<Props> = ({ route, children }) => {
  const checkIsLoggedIn = useCheckCurrentUser(route);

  // TODO display loader
  if (!checkIsLoggedIn) {
    return <></>;
  }

  return children;
};

export default PrivateRoute;
