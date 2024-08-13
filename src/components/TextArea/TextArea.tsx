import React, { FC, useState } from 'react';
import { TextAreaProps } from '@/types/props';
import styles from './TextArea.module.scss';
import { checkForStringAndReturnEmptyIfFalsy } from '@/utils/globals';
import { getTextAreaCharacterCountStyling } from '@/utils/formUtils';

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
  const [characterCount, setCharacterCount] = useState(value?.length ?? 0);

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
      {hint && (
        <p aria-label="hint-text" className={styles.hint}>
          {hint}
        </p>
      )}
      <textarea
        id={id}
        value={value}
        onChange={handleChange}
        className={styles.textArea}
        placeholder={checkForStringAndReturnEmptyIfFalsy(placeholder)}
        maxLength={characterLimit}
        aria-label={ariaLabel}
      />
      <div className={styles.characterCount}>
        <span className={styles[getTextAreaCharacterCountStyling(characterCount, characterLimit)]}>
          {characterCount > 0 && <span>{characterCount} out of </span>}
          {characterLimit} characters
        </span>
      </div>
    </div>
  );
};

export default TextArea;
