import { FC, ChangeEvent } from 'react';
import styles from './RadioButton.module.scss';
import { RadioButtonProps } from '@/types/props';

const RadioButton: FC<RadioButtonProps> = ({
  name,
  value,
  label,
  onChange,
  checked,
  className,
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
      />
      <label htmlFor={value}>
        <span>{label}</span>
      </label>
    </div>
  );
};
export default RadioButton;
