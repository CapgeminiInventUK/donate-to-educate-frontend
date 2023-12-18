import { FC, useState } from 'react';
import styles from './Dropdown.module.scss';
import { DropdownProps } from '@/types/props';
import Select, { SingleValue } from 'react-select';
import { DropdownOption } from '@/types/data';
import './ReactSelectOverrides.scss';
import { getValueFromOptionsByLabel } from '@/utils/formUtils';

const Dropdown: FC<DropdownProps> = ({
  header,
  subHeading,
  options,
  onChange,
  isLarge,
  formMeta,
  value,
}) => {
  const [dropDownValue, setDropdownValue] = useState(getValueFromOptionsByLabel(options, value));

  const handleSelect = (option: SingleValue<DropdownOption>): void => {
    setDropdownValue(option);
    onChange && onChange(option?.label ?? '', formMeta);
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
        placeholder={value}
      />
    </div>
  );
};

export default Dropdown;
