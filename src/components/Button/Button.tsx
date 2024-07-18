import type { ButtonProps } from '@/types/props';
import { checkForStringAndReturnEmptyIfFalsy } from '@/utils/globals';
import type { FC } from 'react';
import styles from './Button.module.scss';

const Button: FC<ButtonProps> = ({ onClick, text, theme, className, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      className={`${styles[theme]} ${checkForStringAndReturnEmptyIfFalsy(className)} ${disabled ? styles.disabled : ''}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
