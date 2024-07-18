import BackButton from '@/components/BackButton/BackButton';
import Card from '@/components/Card/Card';
import Paths from '@/config/paths';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import type { FC } from 'react';
import styles from './FindCharity.module.scss';
import FindCharityTable from './FindCharityTable';

const FindCharity: FC = () => {
  const { state } = useLocationStateOrRedirect<{ postcode: string }>(Paths.FIND_YOUR_COMMUNITY);
  return (
    <div className={styles.container}>
      <BackButton theme="blue" />
      <Card>
        <FindCharityTable
          title={`Find charities near ${state.postcode.toUpperCase()}`}
          postcode={state.postcode}
        />
      </Card>
    </div>
  );
};

export default FindCharity;
