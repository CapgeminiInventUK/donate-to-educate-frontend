import React, { FC, useState } from 'react';
import styles from './TextInput.module.scss';
import { TextInputProps } from '@/types/props';
import ShowHide from '../ShowHide/ShowHide';

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
    <div className={styles.wrapper}>
      {header && <h4 className={styles.header}>{header}</h4>}
      {subHeading && <h5 className={styles.subHeading}>{subHeading}</h5>}
      {password && <ShowHide onChangePasswordVisibility={handleChangePasswordVisibility} />}
      <input
        type={password ? inputType : 'text'}
        value={value}
        onChange={handleChange}
        className={`${styles.input} ${isLarge ? styles.inputLarge : ''} ${
          isSmall ? styles.inputSmall : ''
        }`}
        placeholder={placeholder ?? ''}
        disabled={disabled}
      />
    </div>
  );
};

export default TextInput;
