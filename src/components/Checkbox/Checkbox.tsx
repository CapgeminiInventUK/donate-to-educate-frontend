import Checkmark from '@/assets/tiles/Checkmark';
import type { CheckboxProps } from '@/types/props';
import { checkForStringAndReturnEmptyIfFalsy } from '@/utils/globals';
import { type FC, useEffect, useState } from 'react';
import styles from './Checkbox.module.scss';

const Checkbox: FC<CheckboxProps> = ({
  label,
  className,
  onChange,
  initialValue = false,
  value,
  formMeta,
  ariaLabel,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(initialValue);

  useEffect(() => {
    if (value !== undefined) {
      setIsChecked(value);
    }
  }, [value]);

  const handleChange = (): void => {
    setIsChecked(!isChecked);
    if (onChange) {
      onChange(!isChecked, formMeta);
    }
  };

  return (
    <label onKeyDown={(event): void => (event.key === 'Enter' ? handleChange() : undefined)}>
      <input type="checkbox" tabIndex={-1} onChange={handleChange} aria-label={ariaLabel} />
      <div
        tabIndex={0}
        className={`${styles.checkbox} ${checkForStringAndReturnEmptyIfFalsy(className)}`}
      >
        <Checkmark isChecked={isChecked}></Checkmark>
      </div>
      {label}
    </label>
  );
};
export default Checkbox;
