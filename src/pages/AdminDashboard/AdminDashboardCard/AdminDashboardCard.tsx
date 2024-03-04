import { FC } from 'react';
import { FormButtonThemes } from '@/types/props';
import FormButton from '@/components/FormButton/FormButton';
import Spinner from '@/components/Spinner/Spinner';
import styles from './AdminDashboardCard.module.scss';

interface AdminDashboardCardProps {
  isLoading: boolean;
  title: string;
  body: string;
  onClick: () => void;
  stats: JSX.Element;
  className: string;
  buttonTheme?: FormButtonThemes;
}

const AdminDashboardCard: FC<AdminDashboardCardProps> = ({
  isLoading,
  title,
  body,
  onClick,
  stats,
  className,
  buttonTheme = 'formButtonGrey',
}): JSX.Element => {
  return (
    <div className={`${styles.card} ${styles[`${className}`]}`}>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          <h3>{title}</h3>
          <div className={styles.border}>{stats}</div>
          <br />
          <div>{body}</div>
          <br />
          <FormButton
            text={'Start'}
            theme={buttonTheme}
            onClick={onClick}
            fullWidth
            ariaLabel="start"
          />
        </>
      )}
    </div>
  );
};

export default AdminDashboardCard;
