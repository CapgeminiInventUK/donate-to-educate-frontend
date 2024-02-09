import { FC } from 'react';
import styles from './BackButton.module.scss';
import { ButtonProps } from '@/types/props';
import ChevronLeft from '@/assets/navigation/ChevronLeft';

const BackButton: FC<Pick<ButtonProps, 'onClick' | 'className'> & { theme: 'white' | 'blue' }> = ({
  onClick,
  className,
  theme,
}) => {
  return (
    <button
      className={`${styles.back} ${className ?? ''} ${styles[theme]}`}
      onClick={onClick}
      type="button"
    >
      <ChevronLeft colour={theme} />
      <h4>Back</h4>
    </button>
  );
};

export default BackButton;
