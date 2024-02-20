import { FC, useEffect, useState } from 'react';
import styles from './Dropdown.module.scss';
import { DropdownProps } from '@/types/props';
import Select, { SingleValue } from 'react-select';
import { DropdownOption, FilterDropdownOption } from '@/types/data';
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
  const [displayedOptions, setDisplayedOptions] = useState<DropdownOption[]>([]);
  const [placeholder, setPlaceholder] = useState(value);

  // eslint-disable-next-line no-console
  console.log(header);

  const handleSelect = (option: SingleValue<DropdownOption>): void => {
    setDropdownValue(option);
    onChange && onChange(option?.label ?? '', formMeta, { ...option });
  };

  const onSearch = (newValue: string): void => {
    const newOptions = options.filter(({ label }) =>
      label?.toLowerCase().includes(newValue.toLowerCase())
    );

    if (newOptions?.length > 2000) {
      setDisplayedOptions([]);
    } else {
      setDisplayedOptions(newOptions);
    }
  };

  const filterOptions = ({ label }: FilterDropdownOption, input: string): boolean => {
    if (!input) {
      return true;
    }
    return !!label?.toLowerCase().includes(input.toLowerCase());
  };

  useEffect(() => {
    if (!value) {
      setPlaceholder('Start typing to search');
    } else {
      setPlaceholder(value);
    }
  }, [value]);

  return (
    <div className={styles.wrapper}>
      {header && <h4 className={styles.header}>{header}</h4>}
      {subHeading && <h5 className={styles.subHeading}>{subHeading}</h5>}
      <Select
        className={styles.select}
        classNamePrefix={`${isLarge ? 'selectLarge' : 'select'}`}
        options={displayedOptions}
        onChange={handleSelect}
        value={dropDownValue}
        placeholder={placeholder}
        onInputChange={onSearch}
        filterOption={filterOptions}
        isClearable
        required={!header?.includes('optional')}
      />
    </div>
  );
};

export default Dropdown;
