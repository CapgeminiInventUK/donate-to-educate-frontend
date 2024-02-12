import { FC, useState } from 'react';
import { RadioGroupProps } from '@/types/props';
import RadioButton from '../RadioButton/RadioButton';

const RadioGroup: FC<RadioGroupProps> = ({ name, values, labels, className, handleChange }) => {
  const [selectedInput, setSelectedInput] = useState('');

  function myHandleChange(input: string): void {
    setSelectedInput(input);

    if (handleChange !== undefined) {
      handleChange(input);
      return;
    }
  }

  return (
    <div>
      {values.map((value: string, index: number) => {
        return (
          <RadioButton
            key={value}
            name={name}
            value={values[index]}
            label={labels != null ? labels[index] : ''}
            onChange={myHandleChange}
            className={className}
            checked={selectedInput === values[index]}
          ></RadioButton>
        );
      })}
    </div>
  );
};
export default RadioGroup;
