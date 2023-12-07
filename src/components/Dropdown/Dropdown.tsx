import { FC, useState } from 'react';
import styles from './Dropdown.module.scss';
import { DropdownProps } from '@/types/props';
import Select, { SingleValue } from 'react-select';
import { DropdownOption } from '@/types/data';
import './ReactSelectOverrides.scss';

const Dropdown: FC<DropdownProps> = ({ header, name, subHeading, options, onChange, isLarge }) => {
  const [dropDownValue, setDropdownValue] = useState<SingleValue<DropdownOption>>();

  const handleSelect = (option: SingleValue<DropdownOption>): void => {
    setDropdownValue(option);
    onChange(option?.label ?? '');
  };

  return (
    <div className={styles.wrapper}>
      {header && <h4 className={styles.header}>{header}</h4>}
      {subHeading && <h5 className={styles.subHeading}>{subHeading}</h5>}
      <Select
        className={styles.select}
        classNamePrefix={`${isLarge ? 'selectLarge' : 'select'}`}
        options={options}
        onChange={handleSelect}
        value={dropDownValue}
        name={name}
        placeholder={''}
      />
    </div>
  );
};

export default Dropdown;
