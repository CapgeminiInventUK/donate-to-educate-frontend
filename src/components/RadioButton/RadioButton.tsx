import type { RadioButtonProps } from '@/types/props';
import type { ChangeEvent, FC } from 'react';
import styles from './RadioButton.module.scss';

const RadioButton: FC<RadioButtonProps> = ({
  name,
  value,
  label,
  onChange,
  checked,
  className,
  ariaLabel,
}) => {
  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.id;
    onChange(value);
  };

  return (
    <div>
      <input
        type="radio"
        className={`${className} ${styles.custom}`}
        name={name}
        id={value}
        checked={checked}
        onChange={handleRadioChange}
        aria-label={ariaLabel}
      />
      <label htmlFor={value}>
        <span>{label}</span>
      </label>
    </div>
  );
};
export default RadioButton;
