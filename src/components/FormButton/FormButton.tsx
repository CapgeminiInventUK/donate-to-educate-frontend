import type { FormButtonProps } from '@/types/props';
import { getArrowColour } from '@/utils/button';
import type { FC } from 'react';
import styles from './FormButton.module.scss';

const FormButton: FC<FormButtonProps> = ({
  onClick,
  text,
  theme,
  useArrow = false,
  fullWidth = false,
  className,
  disabled = false,
  children,
  ariaLabel,
}) => {
  return (
    <button
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={
        theme === 'formButtonDisabled'
          ? (): void => {
              return;
            }
          : onClick
      }
      className={`${styles[theme]} ${fullWidth ? styles.fullWidth : ''} ${className ? className : ''}`}
    >
      <span className={styles.text}>
        {children}
        {text}
      </span>
      {useArrow && (
        <div>
          <img src={getArrowColour(theme)} alt="Right arrow" height={'30'} width={'30'} />
        </div>
      )}
    </button>
  );
};

export default FormButton;
