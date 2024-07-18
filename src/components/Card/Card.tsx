import type { CardProps } from '@/types/props';
import type { FC } from 'react';
import styles from './Card.module.scss';

const Card: FC<CardProps> = ({ children, className }) => {
  return <div className={`${styles.card} ${className ? className : ''}`}>{children}</div>;
};
export default Card;
