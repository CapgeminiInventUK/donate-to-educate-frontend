import { Dispatch, ReactNode, SetStateAction } from 'react';
import { ComponentDataPropsType, ComponentType, FormDataItem } from '@/types/data';
import {
  CheckYourAnswersProps,
  CheckboxProps,
  DropdownProps,
  FormIntroPageProps,
  RadioGroupProps,
  TextAreaProps,
  TextInputProps,
} from '@/types/props';
import TextInput from '@/components/TextInput/TextInput';
import RadioGroup from '@/components/RadioGroup/RadioGroup';
import Checkbox from '@/components/Checkbox/Checkbox';
import TextArea from '@/components/TextArea/TextArea';
import Dropdown from '@/components/Dropdown/Dropdown';
import FormIntroPage from '@/components/FormIntroPage/FormIntroPage';
import CheckYourAnswers from '@/components/CheckYourAnswers/CheckYourAnswers';

export const createFormComponent = (
  componentType: ComponentType,
  formData: FormDataItem[],
  componentData?: ComponentDataPropsType,
  setPageNumber?: Dispatch<SetStateAction<number>>
): ReactNode => {
  switch (componentType) {
    case ComponentType.INTRO:
      return <FormIntroPage {...(componentData as FormIntroPageProps)} />;
    case ComponentType.TEXT:
      return <TextInput {...(componentData as TextInputProps)} />;
    case ComponentType.TEXTAREA:
      return <TextArea {...(componentData as TextAreaProps)} />;
    case ComponentType.RADIO:
      return <RadioGroup {...(componentData as RadioGroupProps)} />;
    case ComponentType.CHECKBOX:
      return <Checkbox {...(componentData as CheckboxProps)} />;
    case ComponentType.DROPDOWN:
      return <Dropdown {...(componentData as DropdownProps)} />;
    case ComponentType.CYA:
      return (
        <CheckYourAnswers
          {...(componentData as CheckYourAnswersProps)}
          formData={formData}
          setPageNumber={setPageNumber}
        />
      );
    default:
      return <></>;
  }
};
