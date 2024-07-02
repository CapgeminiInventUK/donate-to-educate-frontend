import { FC } from 'react';
import styles from './Button.module.scss';
import { ButtonProps } from '@/types/props';
import { checkForStringAndReturnEmptyIfFalsy } from '@/utils/globals';

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
