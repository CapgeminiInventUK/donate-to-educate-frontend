import { FC } from 'react';
import styles from './Button.module.scss';
import { ButtonProps } from '@/types/props';
import { record } from 'aws-amplify/analytics';

const Button: FC<ButtonProps> = ({
  onClick,
  collectData = false,
  text,
  theme,
  className,
  disabled = false,
}): React.ReactElement => {
  const handleClick = (): void => {
    if (onClick) {
      onClick();
    }
    if (collectData) {
      const textValue = typeof text === 'string' ? text : 'JSXElement';
      const classNameValue = typeof className === 'string' ? className : 'JSXElement';
      const disabledValue = disabled ? 'true' : 'false';

      record({
        name: 'ButtonClicked',
        attributes: {
          text: textValue,
          theme: theme.toString(),
          className: classNameValue,
          disabled: disabledValue,
        },
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`${styles[theme]} ${className ?? ''} ${disabled ? styles.disabled : ''}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
