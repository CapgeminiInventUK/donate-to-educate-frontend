import { ChangeEvent, FC, useState } from 'react';
import styles from './Dropdown.module.scss';
import { DropdownProps } from '@/types/props';

const Dropdown: FC<DropdownProps> = ({ header, name, subHeading, options, onChange }) => {
  const [dropDownValue, setDropdownValue] = useState('');

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>): void => {
    setDropdownValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.header}>{header}</h3>
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
