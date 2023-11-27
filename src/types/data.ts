import { ErrorInfo } from 'react';
import {
  CheckboxProps,
  ExternalLinkProps,
  RadioGroupProps,
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
  componentData: ComponentDataPropsType;
  formComponentLink?: ExternalLinkProps;
}

export type ComponentDataPropsType =
  | TextInputProps
  | RadioGroupProps
  | CheckboxProps
  | TextAreaProps;

export interface FormData {
  formComponents: FormComponent[];
}

export enum ComponentType {
  TEXT = 'textInput',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  TEXTAREA = 'textArea',
  DROPDOWN = 'dropdown',
  INTRO = 'intro',
}
