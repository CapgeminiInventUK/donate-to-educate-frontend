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
  formMeta,
}) => {
  const [value, setValue] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const inputValue = event.target.value;
    setValue(inputValue);
    setCharacterCount(inputValue.length);
    if (onChange) {
      onChange(inputValue, formMeta);
    }
  };

  return (
    <div className={styles.container}>
      {header && <h4 className={styles.header}>{header}</h4>}
      {subHeading && <h5 className={styles.subHeading}>{subHeading}</h5>}
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
