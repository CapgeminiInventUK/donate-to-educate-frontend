import { ErrorInfo } from 'react';
import { CheckboxProps, ExternalLinkProps, RadioGroupProps, TextInputProps } from './props';

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
  componentData: TextInputProps | RadioGroupProps | CheckboxProps;
  formComponentLink?: ExternalLinkProps;
}

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
