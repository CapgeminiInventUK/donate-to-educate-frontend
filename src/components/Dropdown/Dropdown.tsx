import { FC, useState } from 'react';
import styles from './Dropdown.module.scss';
import { DropdownProps } from '@/types/props';
import Select, { SingleValue } from 'react-select';
import { DropdownOption, FilterDropdownOption } from '@/types/data';
import './ReactSelectOverrides.scss';
import { getValueFromOptionsByLabel } from '@/utils/formUtils';
import { checkForStringAndReturnEmptyIfFalsy } from '@/utils/globals';

const Dropdown: FC<DropdownProps> = ({
  header,
  subHeading,
  options,
  onChange,
  isLarge,
  formMeta,
  value,
  optional,
}) => {
  const [dropDownValue, setDropdownValue] = useState(getValueFromOptionsByLabel(options, value));
  const [displayedOptions, setDisplayedOptions] = useState<DropdownOption[]>([]);
  const placeholderText = subHeading?.includes('council')
    ? 'Search for your local council'
    : 'Search for your school';

  const handleSelect = (option: SingleValue<DropdownOption>): void => {
    setDropdownValue(option);
    onChange &&
      onChange(checkForStringAndReturnEmptyIfFalsy(option?.label), formMeta, { ...option });
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
    return !!label?.toLowerCase().includes(input.toLowerCase());
  };

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
        placeholder={placeholderText}
        onInputChange={onSearch}
        filterOption={filterOptions}
        isClearable
        required={!optional}
      />
    </div>
  );
};

export default Dropdown;
