import type { ButtonProps } from '@/types/props';
import { checkForStringAndReturnEmptyIfFalsy } from '@/utils/globals';
import type { FC } from 'react';
import styles from './CancelButton.module.scss';

const CancelButton: FC<
  Pick<ButtonProps, 'onClick' | 'className'> & { theme: 'white' | 'blue' }
> = ({ onClick, className, theme }) => {
  return (
    <button
      className={`${styles.cancel} ${checkForStringAndReturnEmptyIfFalsy(className)} ${styles[theme]}`}
      onClick={onClick}
      type="button"
      aria-label="cancel"
    >
      Cancel
    </button>
  );
};

export default CancelButton;
