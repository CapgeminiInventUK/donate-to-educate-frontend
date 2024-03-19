import { FC } from 'react';
import PublicDashboard from '@/components/PublicDashboard/PublicDashboard';
import BackButton from '@/components/BackButton/BackButton';
import styles from './CharityDashboard.module.scss';

const CharityDashboard: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <BackButton theme="blue" />
        <PublicDashboard type="charity" name="" />
      </div>
    </div>
  );
};

export default CharityDashboard;
