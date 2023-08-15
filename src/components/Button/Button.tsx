import { ReactElement, FC } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  theme: 'darkBlue' | 'midBlue';
  onClick: () => void;
  text: string;
  className?: string;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  onClick,
  text,
  theme,
  className,
  disabled = false,
}): ReactElement => {
  return (
    <button
      onClick={onClick}
      className={`${styles[theme]} ${className ?? ''} ${disabled ? styles.disabled : ''}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
