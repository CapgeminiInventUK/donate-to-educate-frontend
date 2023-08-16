import { ReactNode } from 'react';

export interface LayoutProps {
  header?: ReactNode;
  footer?: ReactNode;
  page: ReactNode;
}

export type Themes = 'darkBlue' | 'midBlue';

export interface ButtonProps {
  theme: Themes;
  onClick: () => void;
  text: string;
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
  className: string;
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
