import { ReactNode } from 'react';
import { CarouselItem } from './data';

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
  colour?: string;
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
