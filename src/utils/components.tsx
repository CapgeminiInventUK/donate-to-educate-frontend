import { Dispatch, ReactNode, SetStateAction } from 'react';
import { ComponentDataPropsType, ComponentType, FormDataItem, FormMeta } from '@/types/data';
import {
  CheckYourAnswersProps,
  CheckboxProps,
  CommonInputProps,
  DropdownProps,
  FormIntroPageProps,
  RadioGroupProps,
  SummaryProps,
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
import { findValueFromFormData } from './formUtils';
import Summary from '@/components/Summary/Summary';
import CannotFindSchool from '@/components/CannotFindSchool/CannotFindSchool';

export const createFormComponent = (
  componentType: ComponentType,
  formData: FormDataItem[],
  componentData?: ComponentDataPropsType,
  setPageNumber?: Dispatch<SetStateAction<number>>,
  onChange?: (
    value: string | number | boolean,
    formMeta: FormMeta | undefined,
    fullValue?: Record<string, unknown>
  ) => void,
  errorMessage?: string
): ReactNode => {
  const { formMeta: { field = '' } = {} } = componentData as CommonInputProps;

  const value = findValueFromFormData(formData, field);
  switch (componentType) {
    case ComponentType.INTRO:
      return <FormIntroPage {...(componentData as FormIntroPageProps)} />;
    case ComponentType.TEXT:
      return (
        <TextInput
          {...(componentData as TextInputProps)}
          value={String(value)}
          onChange={onChange}
          errorMessage={errorMessage}
        />
      );
    case ComponentType.TEXTAREA:
      return (
        <TextArea {...(componentData as TextAreaProps)} value={String(value)} onChange={onChange} />
      );
    case ComponentType.RADIO:
      return <RadioGroup {...(componentData as RadioGroupProps)} />;
    case ComponentType.CHECKBOX:
      return <Checkbox {...(componentData as CheckboxProps)} onChange={onChange} />;
    case ComponentType.DROPDOWN:
      return (
        <Dropdown {...(componentData as DropdownProps)} value={String(value)} onChange={onChange} />
      );
    case ComponentType.SCHOOL_NOT_FOUND:
      return <CannotFindSchool />;
    case ComponentType.CYA:
      return (
        <CheckYourAnswers
          {...(componentData as CheckYourAnswersProps)}
          formData={formData}
          setPageNumber={setPageNumber}
        />
      );
    case ComponentType.SUMMARY:
      return <Summary {...(componentData as SummaryProps)} />;
    default:
      return <></>;
  }
};
