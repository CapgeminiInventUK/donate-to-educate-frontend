import { FC } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import LogoWhite from '@/assets/logo/LogoWhite';
import Paths from '@/config/paths';
import Email from '@/assets/admin/Email';
import styles from './LocalAuthoritySignUpConfirmation.module.scss';

const LocalAuthoritySignUpConfirmation: FC = () => {
  const location = useLocation() as { state: { name: string } };

  if (!(location.state && 'name' in location.state)) {
    return <Navigate to={Paths.ADMIN_DASHBOARD} />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <Email />
        <h2>You have created an account for {location.state.name} County Council</h2>
        <p>The main user has been emailed with instructions to set up their profile</p>
        <LogoWhite className={styles.logo} />
        <Link to={Paths.ADMIN_DASHBOARD}>Return to dashboard</Link>
      </div>
    </div>
  );
};

export default LocalAuthoritySignUpConfirmation;
