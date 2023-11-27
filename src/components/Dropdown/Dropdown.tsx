import { FC, useState } from 'react';
import styles from './Dropdown.module.scss';
import { DropdownProps } from '@/types/props';

const Dropdown: FC<DropdownProps> = ({ header, name, subHeading }) => {
  const [value] = useState('');
  const [error] = useState<string | null>(null);

  return (
    <div className={`${styles.wrapper} ${error ? styles.error : ''}`}>
      <h3 className={styles.header}>{header}</h3>
      {error && <p className={styles.errorMessage}>{error}</p>}
      {subHeading && <p className={styles.subHeading}>{subHeading}</p>}
      <label htmlFor="dropdown" className={styles.label}>
        <select name={name}>
          <option value={value}>Test 1</option>
          <option value={value}>Test 2</option>
        </select>
      </label>
    </div>
  );
};

export default Dropdown;
