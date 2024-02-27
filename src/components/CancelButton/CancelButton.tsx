import { FC } from 'react';
import styles from './CancelButton.module.scss';
import { ButtonProps } from '@/types/props';

const CancelButton: FC<
  Pick<ButtonProps, 'onClick' | 'className'> & { theme: 'white' | 'blue' }
> = ({ onClick, className, theme }) => {
  return (
    <button
      className={`${styles.cancel} ${className ?? ''} ${styles[theme]}`}
      onClick={onClick}
      type="button"
    >
      <h4>Cancel</h4>
    </button>
  );
};

export default CancelButton;
