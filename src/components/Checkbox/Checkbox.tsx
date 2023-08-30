import { ReactElement, FC, useState } from 'react';
import styles from './Checkbox.module.scss';
import { CheckboxProps } from '@/types/props';

const Checkbox: FC<CheckboxProps> = ({ label, className }): ReactElement => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <label>
      <input
        type="checkbox"
        onChange={(): void => {
          setIsChecked(!isChecked);
        }}
      />
      <div tabIndex={1} className={`${styles.checkbox} ${className ?? ''}`}>
        <svg
          focusable="false"
          viewBox="0 0 15 11"
          fill="none"
          // This element is purely decorative so
          // we hide it for screen readers
          aria-hidden="true"
        >
          <path d="M1 4.5L5 9L14 1" strokeWidth="3" stroke={isChecked ? '#394150' : 'none'} />
        </svg>
      </div>
      {label}
    </label>
  );
};
export default Checkbox;
