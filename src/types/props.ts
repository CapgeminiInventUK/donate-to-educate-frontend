import { ChangeEvent, Dispatch, ReactNode, SetStateAction } from 'react';
import { CarouselItem, FormData } from './data';

export interface LayoutProps {
  header?: ReactNode;
  footer?: ReactNode;
  page: ReactNode;
}

export type Themes = 'darkBlue' | 'midBlue' | 'link';

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
  name?: string;
}

export interface SvgProps {
  className?: string;
  onClick?: () => void;
  colour?: string;
}

export interface HeaderProps {
  text: string;
  className?: string;
}

export interface PillProps {
  color: 'green' | 'blue' | 'yellow' | 'grey' | 'red';
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
  items: CarouselItem[];
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
  subHeading?: string;
  validator?: (input: string) => ValidationResult;
  placeholder?: string;
  password?: boolean;
  id?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface FormContainerProps {
  formData: FormData[];
  pageNumber: number;
  setPageNumber: Dispatch<SetStateAction<number>>;
}

export interface TextAreaProps {
  header: string;
  characterLimit: number;
  subHeading?: string;
  hint?: string;
  placeholder?: string;
  id?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface ExternalLinkProps {
  linkText: string;
  linkUrl: string;
  className?: string;
}
