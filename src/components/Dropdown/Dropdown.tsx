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

  const handleSelect = (option: SingleValue<DropdownOption>): void => {
    setDropdownValue(option);
    onChange && onChange(option?.label ?? '', formMeta, { ...option });
  };

  const onSearch = (newValue: string): void => {
    const newOptions = options.filter(
      ({ label, postcode }) =>
        label.includes(newValue) || postcode?.includes(newValue.toUpperCase())
    );

    if (newOptions?.length > 2000) {
      setDisplayedOptions([]);
    } else {
      setDisplayedOptions(newOptions);
    }
  };

  const filterOptions = (option: FilterDropdownOption, input: string): boolean => {
    if (!input) {
      return true;
    }
    const {
      label,
      data: { postcode },
    } = option;
    return !!(label.includes(input) || postcode?.includes(input.toUpperCase()));
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
      />
    </div>
  );
};

export default Dropdown;
