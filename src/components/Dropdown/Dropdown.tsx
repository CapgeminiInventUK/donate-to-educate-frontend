import { ChangeEvent, FC, useState } from 'react';
import styles from './Dropdown.module.scss';
import { DropdownProps } from '@/types/props';

const Dropdown: FC<DropdownProps> = ({ header, name, subHeading, options }) => {
  const [dropDownValue, setDropdownValue] = useState('');
  const [error] = useState<string | null>(null);

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>): void => {
    setDropdownValue(event.target.value);
  };

  return (
    <div className={`${styles.wrapper} ${error ? styles.error : ''}`}>
      <h3 className={styles.header}>{header}</h3>
      {error && <p className={styles.errorMessage}>{error}</p>}
      {subHeading && <p className={styles.subHeading}>{subHeading}</p>}
      <label htmlFor="dropdown" className={styles.label}>
        <select value={dropDownValue} name={name} onChange={handleSelect}>
          {options.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Dropdown;
