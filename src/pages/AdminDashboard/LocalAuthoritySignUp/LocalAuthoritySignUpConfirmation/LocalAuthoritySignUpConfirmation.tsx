import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoWhite from '@/assets/logo/LogoWhite';
import { signOut } from 'aws-amplify/auth';
import Button from '@/components/Button/Button';
import Paths from '@/config/paths';
import Email from '@/assets/admin/Email';
import dashboardStyles from '../AdminDashboard.module.scss';
import styles from './LocalAuthoritySignUpConfirmation.module.scss';

const LocalAuthoritySignUpConfirmation: FC = () => {
  const navigate = useNavigate();

  return (
    <div className={dashboardStyles.container}>
      <div className={dashboardStyles.adminCard}>
        <div className={dashboardStyles.header}>
          <h1>Local Authority Profile</h1>
          <Button
            theme="link"
            text="Sign out"
            className={dashboardStyles.actionButtons}
            onClick={(): void => {
              void signOut()
                .then(() => navigate(Paths.LOGIN))
                // eslint-disable-next-line no-console
                .catch(console.error);
            }}
          />
        </div>
        <div className={dashboardStyles.body}>
          <Email />
          <h2>You have created an account for SELECTED_LA County Council</h2>
          <p>The main user has been emailed with instructions to set up their profile</p>
          <LogoWhite className={styles.logo} />
          <a onClick={(): void => navigate(Paths.ADMIN_DASHBOARD)}>Return to dashboard</a>
        </div>
      </div>
    </div>
  );
};

export default LocalAuthoritySignUpConfirmation;
