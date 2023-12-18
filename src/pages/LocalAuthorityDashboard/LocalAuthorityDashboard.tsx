import { FC } from 'react';
import styles from './LocalAuthorityDashboard.module.scss';

// Need to make this a protected route only for logged in users of type la.
const LocalAuthorityDashboard: FC = () => {
  return (
    <div className={styles.container}>
      <h2>Local Authority Dashboard</h2>
    </div>
  );
};

export default LocalAuthorityDashboard;
