import { FC, useEffect, useState } from 'react';
import styles from './LocalAuthorityDashboard.module.scss';
import { useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import BackButton from '@/components/BackButton/BackButton';
import LogoutButton from '@/components/LogoutButton/LogoutButton';
import { CustomAttributes, getUserType } from '@/hooks/useCheckCurrentUser';
import Spinner from '@/components/Spinner/Spinner';

const LocalAuthorityDashboard: FC = () => {
  const navigate = useNavigate();
  const [attributes, setAttributes] = useState<CustomAttributes>();

  useEffect(() => {
    if (!attributes) {
      void getUserType().then((attributes) => {
        setAttributes(attributes);
      });
    }
  });

  if (!attributes) {
    return <Spinner />;
  }

  const localAuthority = attributes['custom:institution'];

  return (
    <div className={styles.container}>
      <div className={styles.actionButtons}>
        <BackButton theme="blue" />
        <LogoutButton />
      </div>
      <div className={styles.adminCard}>
        <h1>{localAuthority}</h1>
        <div className={styles.body}>
          <h2>Manage your community</h2>
          <hr />
          <div
            className={`${styles.tileDarkBlue} ${styles.tile}`}
            onClick={() =>
              navigate(Paths.LOCAL_AUTHORITY_DASHBOARD_SCHOOLS, {
                state: { localAuthority },
              })
            }
          >
            <h2>Manage your schools</h2>
            <p>View, edit and remove schools from Donate to Educate in your area.</p>
          </div>
          <div
            className={`${styles.tileLightBlue}  ${styles.tile}`}
            onClick={() =>
              navigate(Paths.LOCAL_AUTHORITY_DASHBOARD_CHARITIES, {
                state: { localAuthority },
              })
            }
          >
            <h2>Manage your charity and volunteer groups</h2>
            <p>
              View, edit and remove charities and volunteer groups from Donate to Educate in your
              area.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalAuthorityDashboard;
