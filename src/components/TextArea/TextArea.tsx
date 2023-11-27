import React, { FC, useState } from 'react';
import { TextAreaProps } from '@/types/props';
import styles from './TextArea.module.scss';

const TextArea: FC<TextAreaProps> = ({
  header,
  placeholder,
  id,
  onChange,
  subHeading,
  hint,
  characterLimit,
}) => {
  const [value, setValue] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const inputValue = event.target.value;
    setValue(inputValue);
    setCharacterCount(event.target.value.length);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div className={`${styles.container}`}>
      <h2 className={styles.header}>{header}</h2>
      {subHeading && <p className={styles.subHeading}>{subHeading}</p>}
      {hint && <p className={styles.hint}>{hint}</p>}
      <textarea
        id={id}
        value={value}
        onChange={handleChange}
        className={styles.textArea}
        placeholder={placeholder ?? ''}
      />
      <div className={styles.characterCount}>
        <span>
          {characterCount > 0 && <span>{characterCount} out of </span>}
          {characterLimit} characters
        </span>
      </div>
    </div>
  );
};

export default TextArea;
