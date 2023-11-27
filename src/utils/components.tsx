import { ReactNode } from 'react';
import { ComponentDataPropsType, ComponentType } from '@/types/data';
import { CheckboxProps, RadioGroupProps, TextAreaProps, TextInputProps } from '@/types/props';
import TextInput from '@/components/TextInput/TextInput';
import RadioGroup from '@/components/RadioGroup/RadioGroup';
import Checkbox from '@/components/Checkbox/Checkbox';
import TextArea from '@/components/TextArea/TextArea';

export const createFormComponent = (
  componentType: ComponentType,
  componentData: ComponentDataPropsType
): ReactNode => {
  switch (componentType) {
    case ComponentType.TEXT:
      return <TextInput {...(componentData as TextInputProps)} />;
    case ComponentType.TEXTAREA:
      return <TextArea {...(componentData as TextAreaProps)} />;
    case ComponentType.RADIO:
      return <RadioGroup {...(componentData as RadioGroupProps)} />;
    case ComponentType.CHECKBOX:
      return <Checkbox {...(componentData as CheckboxProps)} />;

    default:
      return <></>;
  }
};
