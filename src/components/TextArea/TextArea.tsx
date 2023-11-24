import React, { FC, useState } from 'react';
import { TextAreaProps } from '@/types/props';
import styles from './TextArea.module.scss';

const TextArea: FC<TextAreaProps> = ({
  header, placeholder, id,
  onChange,
  subHeading,
}) => {

  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const inputValue = event.target.value;
    setValue(inputValue);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div className={`${styles.wrapper}`}>
      <h2 className={styles.header}>{header}</h2>
      {subHeading && <p className={styles.subHeading}>{subHeading}</p>}
      <label htmlFor="textArea" className={styles.label}>
        <textarea
          id={id}
          value={value}
          onChange={handleChange}
          className={styles.textArea}
          placeholder={placeholder ?? ''}
        />
      </label>
    </div>
  );
};

export default TextArea;
