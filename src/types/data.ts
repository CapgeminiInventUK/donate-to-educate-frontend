import { ErrorInfo } from 'react';
import {
  CheckYourAnswersProps,
  CheckboxProps,
  DropdownProps,
  ExternalLinkProps,
  FormIntroPageProps,
  RadioGroupProps,
  SummaryProps,
  TextAreaProps,
  TextInputProps,
} from './props';

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export interface CarouselItem {
  title: string;
  image: string;
  colour: 'lightBlue' | 'midBlue' | 'darkBlue';
}

export interface FormComponent {
  componentType: ComponentType;
  componentData?: ComponentDataPropsType;
  formComponentLink?: ExternalLinkProps;
  classNameSuffix?: string;
}

export type ComponentDataPropsType =
  | TextInputProps
  | RadioGroupProps
  | CheckboxProps
  | TextAreaProps
  | DropdownProps
  | FormIntroPageProps
  | CheckYourAnswersProps
  | SummaryProps;

export interface FormTemplate {
  formComponents: FormComponent[];
  header?: string;
  subHeader?: string;
  logo?: JSX.Element;
}

export interface FormMeta {
  page?: number;
  field?: string;
  section?: FormSections;
}

export interface FormDataItem {
  field: string;
  value: string | number | boolean;
  page?: number;
  section?: FormSections;
}

export enum FormSections {
  CHARITY_SECTION = 'Your charity or volunteer group',
  YOUR_DETAILS_SECTION = 'Your details',
}

export enum FormNames {
  JOIN = 'Join Donate to Educate',
}

export enum ComponentType {
  TEXT = 'textInput',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  TEXTAREA = 'textArea',
  DROPDOWN = 'dropdown',
  INTRO = 'intro',
  CYA = 'checkYourAnswers',
  SUMMARY = 'summaryPage',
}

export interface DropdownOption {
  value: string | number;
  label: string;
}
