import { ComponentType, ReactNode } from 'react';

export interface LayoutProps {
  header?: ReactNode;
  footer?: ReactNode;
  page: ReactNode;
}

export type Themes = 'darkBlue' | 'midBlue';

export interface ButtonProps {
  theme: Themes;
  onClick: () => void;
  text: string | JSX.Element;
  className?: string;
  disabled?: boolean;
}

export interface ImageProps {
  alt: string;
  image: string;
  height?: number;
  width?: number;
  className?: string;
}

export interface ErrorBoundaryProps {
  children?: ReactNode;
}

export interface SvgProps {
  className?: string;
  onClick?: () => void;
}

export interface HeaderProps {
  text: string;
  className?: string;
}

export interface NavLinksProps {
  theme: Themes;
  activeClassName?: string;
  className?: string;
  buttonClassName?: string;
  linkClassName?: string;
}

export interface ClickableLogoProps {
  colour: 'white' | 'blue';
  className: string;
}

export interface CheckboxProps {
  label?: string;
  className?: string;
  checked?: boolean;
  onChange?: (e: boolean) => void;
}

export interface CheckmarkProps {
  className?: string;
  isChecked: boolean;
}

export interface RadioButtonProps {
  name: string;
  value: string;
  onChange: (e: string) => void;
  checked: boolean;
  label?: string;
  className?: string;
}

export interface RadioGroupProps {
  name: string;
  values: string[];
  labels?: string[];
  className?: string;
}
export interface InfoTileProps {
  colour: 'lightBlue' | 'midBlue' | 'darkBlue';
}

export interface CarouselProps {
  items: {
    title: string;
    image: string;
    colour: 'lightBlue' | 'midBlue' | 'darkBlue';
  }[];
}

export interface FooterPageProps {
  title: string;
  children: JSX.Element[] | JSX.Element;
}

export interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

export interface TextInputProps {
  header: string;
  validator?: (input: string) => ValidationResult;
  placeholder?: string;
}

// ------ Dev only props
export interface PreviewProps<T> {
  Component: ComponentType<T>;
  componentName: string;
  initialProps: T;
}
