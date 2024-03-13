import { FC } from 'react';
import styles from './LogoutButton.module.scss';
import { useNavigate } from 'react-router';
import Paths from '@/config/paths';
import { signOut } from 'aws-amplify/auth';

interface LogoutButtonProps {
  className?: string;
}

const LogoutButton: FC<LogoutButtonProps> = ({ className }) => {
  const navigate = useNavigate();

  return (
    <button
      className={`${styles.back} ${className ?? ''}`}
      onClick={(): void => {
        void signOut()
          .then(() => navigate(Paths.SIGN_IN))
          // eslint-disable-next-line no-console
          .catch(console.error);
      }}
      type="button"
    >
      <h4>Log out</h4>
    </button>
  );
};

export default LogoutButton;
