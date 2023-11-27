import { FC } from 'react';
import styles from './FormButton.module.scss';
import { FormButtonProps } from '@/types/props';
import RightArrow from '../../assets/icons/form-button-right-arrow.svg';

const FormButton: FC<FormButtonProps> = ({ onClick, text, theme, useArrow = false }) => {
  return (
    <button onClick={onClick} className={`${styles[theme] ?? ''}`}>
      <span className={styles.text}>{text}</span>
      {useArrow && (
        <div>
          <img src={RightArrow} alt="Right arrow" height={'30'} width={'30'} />
        </div>
      )}
    </button>
  );
};

export default FormButton;
