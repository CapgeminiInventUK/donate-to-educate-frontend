import { FC, useState } from 'react';
import styles from './Checkbox.module.scss';
import { CheckboxProps } from '@/types/props';
import Checkmark from '@/assets/tiles/Checkmark';

const Checkbox: FC<CheckboxProps> = ({ label, className, onChange, initialValue = false }) => {
  const [isChecked, setIsChecked] = useState<boolean>(initialValue);
  return (
    <label>
      <input
        type="checkbox"
        onChange={(): void => {
          setIsChecked(!isChecked);
          if (onChange) {
            onChange(!isChecked);
          }
        }}
      />
      <div tabIndex={1} className={`${styles.checkbox} ${className ?? ''}`}>
        <Checkmark isChecked={isChecked}></Checkmark>
      </div>
      {label}
    </label>
  );
};
export default Checkbox;
