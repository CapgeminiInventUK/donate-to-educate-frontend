import Email from '@/assets/admin/Email';
import LogoWhite from '@/assets/logo/LogoWhite';
import Paths from '@/config/paths';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './LocalAuthoritySignUpConfirmation.module.scss';

const LocalAuthoritySignUpConfirmation: FC = () => {
  const { state } = useLocationStateOrRedirect<{ name: string }>(Paths.ADMIN_DASHBOARD);

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <Email />
        <h2>You have created an account for {state.name} County Council</h2>
        <p>The main user has been emailed with instructions to set up their profile</p>
        <LogoWhite className={styles.logo} />
        <Link to={Paths.ADMIN_DASHBOARD}>Return to dashboard</Link>
      </div>
    </div>
  );
};

export default LocalAuthoritySignUpConfirmation;
