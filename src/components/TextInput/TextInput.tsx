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
      {header && <h4 className={styles.header}>{header}</h4>}
      {subHeading && <h5 className={styles.subHeading}>{subHeading}</h5>}
      {errorMessage && (
        <h5 className={`${styles.subHeading} ${styles.errorMessage}`}>{errorMessage}</h5>
      )}
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
  );
};

export default TextInput;
