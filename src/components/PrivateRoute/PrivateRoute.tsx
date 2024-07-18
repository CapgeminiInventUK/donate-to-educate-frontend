import Paths from '@/config/paths';
import { useStore } from '@/stores/useStore';
import type { AccountType } from '@/types/data';
import type { PrivateRouteProps } from '@/types/props';
import { getRedirectUrl } from '@/utils/account';
import type { FC } from 'react';
import { useNavigate } from 'react-router';
import Spinner from '../Spinner/Spinner';

const PrivateRoute: FC<PrivateRouteProps> = ({ route = Paths.SIGN_IN, children, authType }) => {
  const { isLoading, user, hasProfile } = useStore((state) => state);
  const navigate = useNavigate();

  if (!route) {
    return children;
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (!user?.type) {
    navigate(route);
    return;
  }

  const { type } = user;

  if (authType !== type) {
    navigate(getRedirectUrl(type as AccountType, hasProfile));
    return;
  }

  return children;
};

export default PrivateRoute;
