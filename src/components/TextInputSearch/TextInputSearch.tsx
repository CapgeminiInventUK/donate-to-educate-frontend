import React, { FC } from 'react';
import { TextInputSearchProps } from '@/types/props';
import styles from './TextInputSearch.module.scss';
import SearchIcon from '@/assets/tiles/Search';
import { checkForStringAndReturnEmptyIfFalsy } from '@/utils/globals';

const TextInputSearch: FC<TextInputSearchProps> = ({
  header,
  placeholder,
  onChange,
  subHeading,
  isLarge,
  isSmall,
  value,
  disabled = false,
  errorMessage,
  ariaLabel,
  onClick,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div className={`${styles.wrapper}  ${errorMessage ? styles.wrapperError : ''}`}>
      {header && <h2 className={styles.header}>{header}</h2>}
      {subHeading && <p className={styles.subHeading}>{subHeading}</p>}
      {errorMessage && (
        <h4 className={`${styles.subHeading} ${styles.errorMessage}`}>{errorMessage}</h4>
      )}
      <div className={styles.searchContainer}>
        <input
          type={'text'}
          value={value}
          onChange={handleChange}
          className={`${styles.input} ${isLarge ? styles.inputLarge : ''} ${
            isSmall ? styles.inputSmall : ''
          } ${errorMessage ? styles.errorInput : ''}`}
          placeholder={checkForStringAndReturnEmptyIfFalsy(placeholder)}
          disabled={disabled}
          required={!header?.includes('optional')}
          aria-label={ariaLabel}
          onKeyDown={(event) => (event.key === 'Enter' ? onClick() : undefined)}
        />
        <div className={styles.searchIconContainer} onClick={onClick}>
          <SearchIcon />
        </div>
      </div>
    </div>
  );
};

export default TextInputSearch;
