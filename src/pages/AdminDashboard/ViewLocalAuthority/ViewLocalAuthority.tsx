import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'aws-amplify/auth';
import Button from '@/components/Button/Button';
import BackButton from '@/components/BackButton/BackButton';
import Paths from '@/config/paths';
import dashboardStyles from '../AdminDashboard.module.scss';

const ViewLocalAuthority: FC = () => {
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
                .then(() => navigate(Paths.SIGN_IN))
                // eslint-disable-next-line no-console
                .catch(console.error);
            }}
            ariaLabel="sign out"
          />
        </div>
        <div className={dashboardStyles.body}>
          <BackButton theme="white" />
        </div>
      </div>
    </div>
  );
};

export default ViewLocalAuthority;
