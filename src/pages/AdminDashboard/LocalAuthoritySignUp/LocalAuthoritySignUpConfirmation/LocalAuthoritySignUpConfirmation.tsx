import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoWhite from '@/assets/logo/LogoWhite';
import Button from '@/components/Button/Button';
import dashboardStyles from '../AdminDashboard.module.scss';
import styles from './LocalAuthoritySignUpConfirmation.module.scss';
import Paths from '@/config/paths';

const LocalAuthoritySignUpConfirmation: FC = () => {
  const icon = 'icon';
  const title = 'title';
  const message = 'message';
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
              return;
            }} // setShouldSignOut(true)}
          />
        </div>
      </div>
      <div className={dashboardStyles.body}>
        {icon}
        <h2>{title}</h2>
        {message}
        <LogoWhite className={styles.logo} />
        <a onClick={(): void => navigate(Paths.ADMIN_DASHBOARD)}>Return to dashboard</a>
      </div>
    </div>
  );
};

export default LocalAuthoritySignUpConfirmation;
