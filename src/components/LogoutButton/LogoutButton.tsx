import { FC } from 'react';
import styles from './LogoutButton.module.scss';
import { useStore } from '@/stores/useStore';
import ExitIcon from '@/assets/icons/exitIcon.svg';

interface LogoutButtonProps {
  className?: string;
}

const LogoutButton: FC<LogoutButtonProps> = ({ className }) => {
  const state = useStore((state) => state);

  return (
    <button
      className={`${styles.back} ${className ?? ''}`}
      onClick={(): void => {
        void state.logout();
      }}
      type="button"
    >
      <h4>Logout</h4>
      <img src={ExitIcon} alt="Edit icon" className={styles.editIcon} />
    </button>
  );
};

export default LogoutButton;
