import React, { FC, useState, useEffect } from 'react';
import styles from './TextInput.module.scss';

export interface TextInputProps {
  header: string;
  validator?: (input: string) => ValidationResult;
  placeholder?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

const TextInput: FC<TextInputProps> = ({ header, validator, placeholder }) => {
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
    <div className={styles.wrapper}>
      <h2 className={styles.header}>{header}</h2>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <label htmlFor="textInput" className={styles.label}>
        <input
          type="text"
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
