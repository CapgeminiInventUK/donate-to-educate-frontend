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
}) => {
  const [value, setValue] = useState('');
  const [inputType, setInputType] = useState('password');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
    if (onChange) {
      onChange(event);
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
      <h3 className={styles.header}>{header}</h3>
      {subHeading && <p className={styles.subHeading}>{subHeading}</p>}
      {password && <ShowHide onChangePasswordVisibility={handleChangePasswordVisibility} />}
      <input
        type={password ? inputType : 'text'}
        value={value}
        onChange={handleChange}
        className={styles.input}
        placeholder={placeholder ?? ''}
      />
    </div>
  );
};

export default TextInput;
