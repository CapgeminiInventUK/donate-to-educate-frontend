import { PillProps } from '@/types/props';
import { FC } from 'react';
import styles from './Pill.module.scss';

export const Pill: FC<PillProps> = ({ text, color }) => {
  return <div className={`${styles[color]} ${styles.container}`}>{text}</div>;
};
