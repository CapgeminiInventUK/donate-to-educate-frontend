import Paths from '@/config/paths';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import type { FC } from 'react';
import DonateAndExcess from '../DonateAndExcess';

const Excess: FC = () => {
  const { state, hasState } = useLocationStateOrRedirect<{ postcode: string }>(
    Paths.FIND_YOUR_COMMUNITY
  );

  return <DonateAndExcess type="excess" postcode={state.postcode} hasState={hasState} />;
};

export default Excess;
