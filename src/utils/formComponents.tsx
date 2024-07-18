import LogoPurple from '@/assets/logo/LogoPurple';
import CannotFindSchool from '@/components/CannotFindSchool/CannotFindSchool';
import CheckYourAnswers from '@/components/CheckYourAnswers/CheckYourAnswers';
import Checkbox from '@/components/Checkbox/Checkbox';
import Dropdown from '@/components/Dropdown/Dropdown';
import FormIntroPage from '@/components/FormIntroPage/FormIntroPage';
import RadioGroup from '@/components/RadioGroup/RadioGroup';
import Summary from '@/components/Summary/Summary';
import TextArea from '@/components/TextArea/TextArea';
import TextInput from '@/components/TextInput/TextInput';
import {
  type ComponentDataPropsType,
  ComponentType,
  type FormDataItem,
  type FormMeta,
} from '@/types/data';
import type {
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
import { CloseOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { findValueFromFormData } from './formUtils';

export const createFormComponent = (
  componentType: ComponentType,
  formData: FormDataItem[],
  componentData?: ComponentDataPropsType,
  setPageNumber?: Dispatch<SetStateAction<number>>,
  onChange?: (
    value: string | boolean,
    formMeta: FormMeta | undefined,
    fullValue?: Record<string, string | boolean>
  ) => void,
  errorMessage?: string,
  optional?: boolean
): ReactNode => {
  const {
    formMeta: { field = '' } = {},
  } = componentData as CommonInputProps;

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
        <Dropdown
          {...(componentData as DropdownProps)}
          value={String(value)}
          onChange={onChange}
          optional={optional}
        />
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

export const openNotification = (
  message: React.ReactNode = <span className="notificationMessage">Save made</span>,
  placement: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' = 'bottomRight',
  icon: React.ReactNode = <LogoPurple />,
  duration = 2,
  closeIcon: React.ReactNode = <CloseOutlined style={{ color: 'white' }} />
): void => {
  notification.info({
    message,
    placement,
    icon,
    className: 'notification',
    duration,
    closeIcon,
  });
};
