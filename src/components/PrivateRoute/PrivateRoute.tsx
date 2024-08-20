import { FC } from 'react';
import { useNavigate } from 'react-router';
import Spinner from '../Spinner/Spinner';
import { getRedirectUrl } from '@/utils/account';
import Paths from '@/config/paths';
import { useStore } from '@/stores/useStore';
import { PrivateRouteProps } from '@/types/props';

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

  if (!authType?.includes(type)) {
    navigate(getRedirectUrl(type, hasProfile));
    return;
  }

  return children;
};

export default PrivateRoute;
