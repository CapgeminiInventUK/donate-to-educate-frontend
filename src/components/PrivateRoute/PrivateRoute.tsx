import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router';
import Spinner from '../Spinner/Spinner';
import { getRedirectUrl } from '@/utils/account';
import Paths from '@/config/paths';
import { useStore } from '@/stores/useStore';
import { AccountType } from '@/types/data';

interface Props {
  route?: string;
  children: ReactNode;
  authType?: AccountType;
}

const PrivateRoute: FC<Props> = ({ route = Paths.SIGN_IN, children, authType }) => {
  const { isLoading, user, hasProfile } = useStore((state) => state);

  if (!route) {
    return children;
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (!user?.type) {
    return <Navigate to={route} />;
  }

  const type = user.type;

  if (authType !== type) {
    return <Navigate to={getRedirectUrl(type as AccountType, hasProfile)} />;
  }

  return children;
};

export default PrivateRoute;
