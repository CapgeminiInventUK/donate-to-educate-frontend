import { FC } from 'react';
import styles from './AdminDashboardCard.module.scss';
import { AdminDashboardCardProps } from '@/types/props';
import { motion } from 'framer-motion';
import { Pill } from '@/components/Pill/Pill';
import { PillColours } from '@/types/data';
import { pluraliseString } from '@/utils/globals';

const AdminDashboardCard: FC<AdminDashboardCardProps> = ({
  title,
  icon,
  body,
  stats,
  amount,
  totalAmount,
  subBody,
  onClick,
  className,
}) => {
  return (
    <motion.div
      className={`${styles.dashboardCard} ${styles[`${className}`]}`}
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      aria-label={className}
    >
      <>
        <div className={styles.icon}>{icon}</div>
        <h3>{title}</h3>
        <div>{body}</div>
        {stats ? (
          <div className={styles.pillContainer}>
            <Pill
              colour={PillColours.GREEN}
              text={`${stats[0]} ${pluraliseString('school request', stats[0])}`}
            />
            <Pill
              colour={PillColours.GREEN}
              text={`${stats[1]} ${pluraliseString('charity request', stats[1])}`}
            />
          </div>
        ) : (
          <div className={styles.numberJoinedArea}>
            <h4>
              <span className={styles.amount}>{amount}</span>{' '}
              {totalAmount && `out of ${totalAmount}`}
            </h4>
            <div className={styles.subBody}>{subBody}</div>
          </div>
        )}
      </>
    </motion.div>
  );
};

export default AdminDashboardCard;
