import { FC } from 'react';
import Paths from '@/config/paths';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import DonateAndExcess from '../DonateAndExcess';

const Donate: FC = () => {
  const { state, hasState } = useLocationStateOrRedirect<{ postcode: string }>(
    Paths.FIND_YOUR_COMMUNITY
  );

  return <DonateAndExcess type="donate" postcode={state.postcode} hasState={hasState} />;
};

export default Donate;
