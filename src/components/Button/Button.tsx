import { FC } from 'react';
import styles from './Button.module.scss';
import { ButtonProps } from '@/types/props';

const Button: FC<ButtonProps> = ({ onClick, text, theme, className, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      className={`${styles[theme]} ${className ?? ''} ${disabled ? styles.disabled : ''}`}
      disabled={disabled}
    >
      <span className={styles.className ?? ''}>{text}</span>
    </button>
  );
};

export default Button;
