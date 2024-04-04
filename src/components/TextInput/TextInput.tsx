import React, { FC, useState } from 'react';
import { TextInputProps } from '@/types/props';
import ShowHide from '../ShowHide/ShowHide';
import styles from './TextInput.module.scss';

const TextInput: FC<TextInputProps> = ({
  header,
  placeholder,
  password = false,
  onChange,
  subHeading,
  isLarge,
  isSmall,
  formMeta,
  value,
  disabled = false,
  errorMessage,
  ariaLabel,
}) => {
  const [inputType, setInputType] = useState('password');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (onChange) {
      onChange(event.target.value, formMeta);
    }
  };

  const handleChangePasswordVisibility = (show: boolean): void => {
    if (show) {
      setInputType('text');
    } else {
      setInputType('password');
    }
  };

  return (
    <div className={`${styles.wrapper}  ${errorMessage ? styles.wrapperError : ''}`}>
      {header && <h3 className={styles.header}>{header}</h3>}
      {subHeading && <h4 className={styles.subHeading}>{subHeading}</h4>}
      {errorMessage && (
        <h4 className={`${styles.subHeading} ${styles.errorMessage}`}>{errorMessage}</h4>
      )}
      <div className={styles.inputContainer}>
        {password && <ShowHide onChangePasswordVisibility={handleChangePasswordVisibility} />}
        <input
          type={password ? inputType : 'text'}
          value={value}
          onChange={handleChange}
          className={`${styles.input} ${isLarge ? styles.inputLarge : ''} ${
            isSmall ? styles.inputSmall : ''
          } ${errorMessage ? styles.errorInput : ''}`}
          placeholder={placeholder ?? ''}
          disabled={disabled}
          required={!header?.includes('optional')}
          aria-label={ariaLabel}
        />
      </div>
    </div>
  );
};

export default TextInput;
