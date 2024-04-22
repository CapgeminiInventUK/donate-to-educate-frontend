import { FC } from 'react';
import FormButton from '@/components/FormButton/FormButton';
import Spinner from '@/components/Spinner/Spinner';
import styles from './AdminDashboardCard.module.scss';
import { AdminDashboardCardProps } from '@/types/props';
import Card from '@/components/Card/Card';

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
    <Card className={`${styles.dashboardCard} ${styles[`${className}`]}`}>
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
    </Card>
  );
};

export default AdminDashboardCard;
