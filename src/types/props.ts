import { Dispatch, ReactNode, SetStateAction } from 'react';
import {
  CarouselItem,
  DropdownOption,
  FormDataItem,
  FormMeta,
  FormNames,
  FormSections,
  FormTemplate,
} from './data';

export interface LayoutProps {
  header?: ReactNode;
  footer?: ReactNode;
  page: ReactNode;
}

export type Themes = 'darkBlue' | 'midBlue' | 'link' | 'link-blue' | 'outline-light' | 'light';

export type FormButtonThemes =
  | 'formButtonDarkBlue'
  | 'formButtonMidBlue'
  | 'formButtonGrey'
  | 'formButtonRed';

export interface ButtonProps {
  theme: Themes;
  onClick: () => void;
  text: string | JSX.Element;
  className?: string;
  disabled?: boolean;
}

export interface FormButtonProps {
  theme: FormButtonThemes;
  onClick: () => void;
  text: string | JSX.Element;
  useArrow?: boolean;
  fullWidth?: boolean;
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
  name?: ErrorBoundaryType;
  location?: string;
}

export type ErrorBoundaryType = 'Router' | 'Generic';

export interface SvgProps {
  className?: string;
  onClick?: () => void;
  colour?: string;
  height?: number;
  width?: number;
}

export interface BackLinkProps {
  route: string;
}

export interface HeaderProps {
  text: string;
  className?: string;
}

export interface PillProps {
  color: 'green' | 'blue' | 'lightBlue' | 'yellow' | 'grey' | 'red';
  text?: string;
}

export interface CookiesSelection {
  selection: 'consented' | 'rejected';
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
  formMeta?: FormMeta;
  onChange?: (value: boolean) => void;
  initialValue?: boolean;
  value?: boolean;
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
  formMeta?: FormMeta;
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

export interface CommonInputProps {
  header?: string;
  subHeading?: string;
  placeholder?: string;
  onChange?: (value: string, meta?: FormMeta) => void;
  formMeta?: FormMeta;
  value?: string;
  disabled?: boolean;
}

export interface TextInputProps extends CommonInputProps {
  password?: boolean;
  isLarge?: boolean;
  isSmall?: boolean;
}

export interface FormContainerProps {
  formTemplate: FormTemplate[];
  pageNumber: number;
  setPageNumber: Dispatch<SetStateAction<number>>;
  formData: FormDataItem[];
}
export interface DropdownProps extends CommonInputProps {
  options: DropdownOption[];
  isLarge?: boolean;
}

export interface TextAreaProps extends CommonInputProps {
  characterLimit: number;
  hint?: string;
  id?: string;
}

export interface ExternalLinkProps {
  linkText: string;
  linkUrl: string;
  className?: string;
}

export interface FormIntroPageProps {
  header: string;
  infoText: string;
  listItems: string[];
  secondaryHeading?: string;
  secondaryInfoText?: string;
  secondaryListItems?: string[];
}

export interface CheckYourAnswersProps {
  sections: FormSections[];
  formName: FormNames;
  formData?: FormDataItem[];
  setPageNumber?: Dispatch<SetStateAction<number>>;
  formMeta: FormMeta;
}

export interface SummaryProps {
  icon?: JSX.Element;
  header: string;
  body: string[];
  logo?: JSX.Element;
}
