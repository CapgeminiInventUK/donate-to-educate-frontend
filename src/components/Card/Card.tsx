import { FC } from 'react';
import styles from './Card.module.scss';
import { CardProps } from '@/types/props';

const Card: FC<CardProps> = ({ children, className }) => {
  return <div className={`${styles.card} ${className ? className : ''}`}>{children}</div>;
};
export default Card;
