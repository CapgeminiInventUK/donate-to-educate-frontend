import { ReactElement, FC, useState } from 'react';
import { RadioGroupProps } from '@/types/props';
import RadioButton from '../RadioButton/RadioButton';

const RadioGroup: FC<RadioGroupProps> = ({ name, values, labels, className }): ReactElement => {
  const [selectedInput, setSelectedInput] = useState('');

  const handleChange = (inputValue: string): void => {
    setSelectedInput(inputValue);
  };

  return (
    <div>
      {values.map((value: string, index: number) => {
        return (
          <RadioButton
            key={`${value}`}
            name={`${name}`}
            value={values[index]}
            label={labels != null ? labels[index] : ''}
            onChange={handleChange}
            className={className}
            checked={selectedInput === values[index]}
          ></RadioButton>
        );
      })}
    </div>
  );
};
export default RadioGroup;
