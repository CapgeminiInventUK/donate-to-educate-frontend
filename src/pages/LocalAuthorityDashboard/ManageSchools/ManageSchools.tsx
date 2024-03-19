import { FC } from 'react';
import styles from './ManageSchools.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import LogoutButton from '@/components/LogoutButton/LogoutButton';
import { useLocation } from 'react-router-dom';
import RegisteredSchools from './SchoolsTables/RegisteredSchools';
import PendingSchools from './SchoolsTables/PendingSchools';

const ManageSchools: FC = () => {
  const { localAuthority } = useLocation().state as { localAuthority: string };

  return (
    <div className={styles.container}>
      <div className={styles.actionButtons}>
        <BackButton theme="blue" />
        <LogoutButton />
      </div>
      <div className={styles.adminCard}>
        <h1>West Sussex</h1>
        <div className={styles.body}>
          <div className={styles.card}>
            <h2>Schools in your area</h2>
            <div className={styles.borderLeft}>
              <div>1 pending request</div>
              <div>5 joined</div>
              <div>147 to join</div>
            </div>
            <RegisteredSchools localAuthority={localAuthority} />
            <PendingSchools localAuthority={localAuthority} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSchools;
