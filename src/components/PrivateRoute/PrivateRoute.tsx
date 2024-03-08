import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router';
import { AccountType, useCheckCurrentUser } from '@/hooks/useCheckCurrentUser';
import Spinner from '../Spinner/Spinner';
import { getRedirectUrl } from '@/utils/account';
import Paths from '@/config/paths';

interface Props {
  route?: string;
  children: ReactNode;
  authType?: AccountType;
}

const PrivateRoute: FC<Props> = ({ route = Paths.SIGN_IN, children, authType }) => {
  const { isLoading, user } = useCheckCurrentUser();

  if (!route) {
    return children;
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (!user || !user['custom:type']) {
    return <Navigate to={route} />;
  }

  const type = user['custom:type'];
  if (authType != type) {
    return <Navigate to={getRedirectUrl(type as AccountType)} />;
  }

  return children;
};

export default PrivateRoute;
