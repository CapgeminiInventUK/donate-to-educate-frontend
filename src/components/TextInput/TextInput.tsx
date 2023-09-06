import React, { FC, useState, useEffect } from 'react';
import styles from './TextInput.module.scss';
import { TextInputProps } from '@/types/props';

const TextInput: FC<TextInputProps> = ({ header, validator, placeholder, password = false }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = event.target.value;
    setValue(inputValue);
  };

  useEffect(() => {
    if (validator) {
      const validationResult = validator(value);
      if (!validationResult.isValid) {
        setError(validationResult.errorMessage ?? 'Error');
      } else {
        setError(null);
      }
    }
  }, [value, validator]);

  return (
    <div className={`${styles.wrapper} ${error ? styles.error : ''}`}>
      <h3 className={styles.header}>{header}</h3>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <label htmlFor="textInput" className={styles.label}>
        <input
          type={password ? 'password' : 'text'}
          id="textInput"
          value={value}
          onChange={handleChange}
          className={styles.input}
          placeholder={placeholder ?? ''}
        />
      </label>
    </div>
  );
};

export default TextInput;
