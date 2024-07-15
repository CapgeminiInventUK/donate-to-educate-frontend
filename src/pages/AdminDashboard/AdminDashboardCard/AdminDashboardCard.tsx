import { FC } from 'react';
import Spinner from '@/components/Spinner/Spinner';
import styles from './AdminDashboardCard.module.scss';
import { AdminDashboardCardProps } from '@/types/props';
import { motion } from 'framer-motion';
import { Pill } from '@/components/Pill/Pill';
import { PillColours } from '@/types/data';

const AdminDashboardCard: FC<AdminDashboardCardProps> = ({
  isLoading,
  title,
  icon,
  body,
  stats,
  amount,
  totalAmount,
  subBody,
  onClick,
  className,
}): JSX.Element => {
  return (
    <motion.div
      className={`${styles.dashboardCard} ${styles[`${className}`]}`}
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
    >
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          <div className={styles.icon}>{icon}</div>
          <h3>{title}</h3>
          <div>{body}</div>
          {stats ? (
            <div className={styles.pillContainer}>
              <Pill
                colour={PillColours.GREEN}
                text={`${stats[0] ?? 0} ${stats[0] === 1 ? ' school request' : ' school requests'}`}
              />
              <Pill
                colour={PillColours.GREEN}
                text={`${stats[1] ?? 0} ${stats[1] === 1 ? ' charity request' : ' charity requests'}`}
              />
            </div>
          ) : (
            <div className={styles.numberJoinedArea}>
              <div>
                <span className={styles.amount}>{amount}</span>{' '}
                {totalAmount && `out of ${totalAmount}`}
              </div>
              <div className={styles.subBody}>{subBody}</div>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default AdminDashboardCard;
