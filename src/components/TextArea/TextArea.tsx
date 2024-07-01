import React, { FC, useState } from 'react';
import { TextAreaProps } from '@/types/props';
import styles from './TextArea.module.scss';
import { checkForStringAndReturnEmptyIfFalsy } from '@/utils/globals';

const maxCharacters = 1000;

const TextArea: FC<TextAreaProps> = ({
  header,
  placeholder,
  id,
  onChange,
  subHeading,
  hint,
  characterLimit,
  formMeta,
  value,
  ariaLabel,
}) => {
  const [characterCount, setCharacterCount] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const inputValue = event.target.value;
    setCharacterCount(inputValue.length);
    if (onChange) {
      onChange(inputValue, formMeta);
    }
  };

  return (
    <div className={styles.container}>
      {header && <h3 className={styles.header}>{header}</h3>}
      {subHeading && <h4 className={styles.subHeading}>{subHeading}</h4>}
      {hint && <p className={styles.hint}>{hint}</p>}
      <textarea
        id={id}
        value={value}
        onChange={handleChange}
        className={styles.textArea}
        placeholder={checkForStringAndReturnEmptyIfFalsy(placeholder)}
        maxLength={maxCharacters}
        aria-label={ariaLabel}
      />
      <div className={styles.characterCount}>
        <span className={styles[getCharacterCountStyling(characterCount)]}>
          {characterCount > 0 && <span>{characterCount} out of </span>}
          {characterLimit} characters
        </span>
      </div>
    </div>
  );
};

const getCharacterCountStyling = (characterCount: number): string => {
  switch (true) {
    case characterCount === maxCharacters:
      return 'red';
    case characterCount >= 750 && characterCount < maxCharacters:
      return 'orange';
    default:
      return '';
  }
};

export default TextArea;
