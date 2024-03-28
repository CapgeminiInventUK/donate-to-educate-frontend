import { FC } from 'react';
import styles from './LogoutButton.module.scss';
import { useStore } from '@/stores/useStore';

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
      <h4>Log out</h4>
    </button>
  );
};

export default LogoutButton;
