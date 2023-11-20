import { FC } from 'react';
import styles from './BackButton.module.scss';
import { ButtonProps } from '@/types/props';
import ChevronLeft from '@/assets/navigation/ChevronLeft';

const BackButton: FC<Pick<ButtonProps, 'onClick' | 'className'>> = ({ onClick, className }) => {
  return (
    <button className={`${styles.back} ${className ?? ''}`} onClick={onClick}>
      <ChevronLeft />
      <h4>Back</h4>
    </button>
  );
};

export default BackButton;
