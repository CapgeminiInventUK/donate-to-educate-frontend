import { FC } from 'react';
import styles from './FindCharity.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import Paths from '@/config/paths';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import Card from '@/components/Card/Card';
import FindCharityTable from './FindCharityTable';

const FindCharity: FC = () => {
  const { state } = useLocationStateOrRedirect<{ postcode: string }>(Paths.FIND_YOUR_COMMUNITY);
  return (
    <div className={styles.container}>
      <BackButton theme="blue" />
      <Card>
        <h2>Find charities near {state.postcode.toUpperCase()}</h2>
        <FindCharityTable />
      </Card>
    </div>
  );
};

export default FindCharity;
