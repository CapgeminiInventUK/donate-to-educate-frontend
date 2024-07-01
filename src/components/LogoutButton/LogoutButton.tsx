import { FC } from 'react';
import { useNavigate } from 'react-router';
import Paths from '@/config/paths';
import styles from './LogoutButton.module.scss';
import { useStore } from '@/stores/useStore';
import ExitIcon from '@/assets/icons/exitIcon.svg';
import { checkForStringAndReturnEmptyIfFalsy } from '@/utils/globals';

interface LogoutButtonProps {
  className?: string;
}

const LogoutButton: FC<LogoutButtonProps> = ({ className }) => {
  const state = useStore((state) => state);
  const navigate = useNavigate();

  return (
    <button
      className={`${styles.back} ${checkForStringAndReturnEmptyIfFalsy(className)}`}
      onClick={(): void => {
        void state.logout();
        navigate(Paths.HOME);
      }}
      type="button"
    >
      <h4>Logout</h4>
      <img src={ExitIcon} alt="Exit icon" className={styles.exitIcon} />
    </button>
  );
};

export default LogoutButton;
