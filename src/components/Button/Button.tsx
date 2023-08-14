import { ReactElement, FC } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  theme: 'darkBlue' | 'midBlue';
  onClick: () => void;
  text: string;
  className: string;
}
const Button: FC<ButtonProps> = ({ onClick, text, theme, className }): ReactElement => {
  return (
    <button onClick={onClick} className={`${styles[theme]} ${className ?? ''}`}>
      {text}
    </button>
  );
};

export default Button;
