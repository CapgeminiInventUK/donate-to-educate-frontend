import { FC, useState, ChangeEvent } from 'react';
import styles from './Checkbox.module.scss';
import { CheckboxProps } from '@/types/props';
import Checkmark from '@/assets/tiles/Checkmark';

const Checkbox: FC<CheckboxProps> = ({ label, className, checked = false, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setIsChecked(event.target.checked);
    if (onChange) {
      onChange(event.target.checked);
    }
  };

  return (
    <label>
      <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
      <div tabIndex={1} className={`${styles.checkbox} ${className ?? ''}`}>
        <Checkmark isChecked={isChecked}></Checkmark>
      </div>
      {label}
    </label>
  );
};

export default Checkbox;
