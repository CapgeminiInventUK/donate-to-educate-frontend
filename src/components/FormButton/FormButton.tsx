import { FC } from 'react';
import styles from './FormButton.module.scss';
import { FormButtonProps } from '@/types/props';
import RightArrowWhite from '../../assets/icons/form-button-right-arrow-white.svg';
import RightArrowGrey from '../../assets/icons/form-button-right-arrow-grey.svg';
import RightArrowBlue from '../../assets/icons/form-button-right-arrow-blue.svg';

const FormButton: FC<FormButtonProps> = ({
  onClick,
  text,
  theme,
  useArrow = false,
  fullWidth = false,
  className,
  disabled = false,
}) => {
  const getArrowColour = (): string => {
    switch (theme) {
      case 'formButtonDarkBlue':
      case 'formButtonMidBlue':
        return RightArrowWhite;
      case 'formButtonGrey':
      case 'formButtonDisabled':
        return RightArrowGrey;
      case 'formButtonRed':
        return RightArrowBlue;
      case 'formButtonGreen':
        return RightArrowWhite;
    }
  };

  return (
    <button
      disabled={disabled}
      onClick={
        theme === 'formButtonDisabled'
          ? (): void => {
              return;
            }
          : onClick
      }
      className={`${styles[theme] ?? ''} ${fullWidth ? styles.fullWidth : ''} ${className ? className : ''}`}
    >
      <span className={styles.text}>{text}</span>
      {useArrow && (
        <div>
          <img src={getArrowColour()} alt="Right arrow" height={'30'} width={'30'} />
        </div>
      )}
    </button>
  );
};

export default FormButton;
