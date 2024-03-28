import { Dispatch, FormEvent, ReactNode, SetStateAction } from 'react';
import {
  CarouselItem,
  ComponentDataPropsType,
  DropdownOption,
  FormDataItem,
  FormMeta,
  FormNames,
  FormSections,
  FormTemplate,
  StageState,
  SchoolTableData,
  SchoolOrCharityProperties,
  RequestUser,
  AccountType,
} from './data';
import Paths from '@/config/paths';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { GraphQLQuery, GraphQLResult } from 'aws-amplify/api';
import { GetJoinRequestsQuery, InsertJoinRequestMutationVariables } from './api';

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
  | 'formButtonRed'
  | 'formButtonGreen'
  | 'formButtonDisabled'
  | 'formButtonLightBlue'
  | 'formButtonGreenDisabled';
export interface ButtonProps {
  theme: Themes;
  onClick: () => void;
  text: string | JSX.Element;
  className?: string;
  disabled?: boolean;
  ariaLabel: string;
}

export interface FormButtonProps {
  theme: FormButtonThemes;
  onClick?: (event: FormEvent<Element>) => void;
  text: string | JSX.Element;
  useArrow?: boolean;
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
  ariaLabel: string;
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
  height?: string;
  width?: string;
}
export interface EditDescriptionProps {
  value: string;
  setValue: (val: string) => void;
  handleSave: () => void;
  handleCancel: () => void;
}
export interface BackLinkProps {
  route: string;
}
export interface ContentType {
  whatToExpect: string;
  actionText: string;
}
export interface HeaderProps {
  text: string;
  className?: string;
  size?: 'normal' | 'small';
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
  className?: string;
  linkClassName?: string;
  buttonClassName?: string;
  activeClassName?: string;
  onLinkClicked?: () => void;
}

export interface RouteProp {
  path: Paths;
  name: string;
}

export interface Route {
  path: Paths;
  element: JSX.Element;
  name?: string;
  redirectRoute?: string;
  authType?: AccountType;
}

export interface NavLinkProps {
  path: Paths;
  name: string;
  theme: Themes;
  childRoutes?: Route[];
  onLinkClicked?: () => void;
}

export interface ClickableLogoProps {
  colour: 'white' | 'blue';
  className: string;
}

export interface CheckboxProps {
  label?: string;
  className?: string;
  formMeta?: FormMeta;
  onChange?: (value: boolean, formMeta: FormMeta | undefined) => void;
  initialValue?: boolean;
  value?: boolean;
  ariaLabel: string;
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
  ariaLabel: string;
}

export interface RadioGroupProps {
  name: string;
  values: string[];
  labels?: string[];
  className?: string;
  formMeta?: FormMeta;
  handleChange?: (input: string) => void;
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
  onChange?: (value: string, meta?: FormMeta, fullValue?: Record<string, string | boolean>) => void;
  formMeta?: FormMeta;
  value?: string;
  disabled?: boolean;
  errorMessage?: string;
  ariaLabel: string;
  optional?: boolean;
}

export interface TextInputProps extends CommonInputProps {
  password?: boolean;
  isLarge?: boolean;
  isSmall?: boolean;
}

export interface MultiStepFormProps {
  formTemplate: FormTemplate[];
  formData: FormDataItem[];
  pageNumber: number;
  setPageNumber: Dispatch<SetStateAction<number>>;
  setHappyPathTemplate?: () => void;
  isLoading?: boolean;
  onChange: (
    value: string | boolean,
    formMeta: FormMeta | undefined,
    fullValue?: Record<string, string | boolean>
  ) => void;
  isSchoolRegistered?: boolean;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<
    QueryObserverResult<GraphQLResult<GraphQLQuery<InsertJoinRequestMutationVariables>>, Error>
  >;
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
  ariaLabel: string;
}

export type InternalLinkProps = ExternalLinkProps;

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

export interface InstitutionBannerProps {
  isAdminView?: boolean;
  phone?: string;
  email?: string;
  website?: string;
  uniformPolicy?: string;
  type: 'school' | 'charity';
  address?: string;
  name?: string;
}

export interface InformationTileProps {
  heading: string;
  subtext: string;
}

export interface EditableInformationTileProps extends InformationTileProps {
  onClick: () => void;
  saveOnClick: () => void;
  isEditing: boolean;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
}

export interface AdminActionTileProps {
  heading: string;
  icon: JSX.Element;
  onClick: () => void;
  isPresent: boolean;
  type: string;
}

export interface AddressInsetProps {
  formData: FormDataItem[];
  componentData: ComponentDataPropsType;
}

export interface FormErrorsProps {
  formErrors: Record<string, string>;
}

export interface SchoolsTableProps {
  data: SchoolTableData[];
  setStage?: Dispatch<SetStateAction<StageState>>;
  setSchoolProperties?: Dispatch<SetStateAction<SchoolOrCharityProperties>>;
}

export interface SchoolsTablesProps {
  localAuthority: string;
  setSchoolsNumber: Dispatch<SetStateAction<number>>;
  setStage: Dispatch<SetStateAction<StageState>>;
  schoolProperties?: SchoolOrCharityProperties;
  setSchoolProperties?: Dispatch<SetStateAction<SchoolOrCharityProperties>>;
  stage: StageState;
}

export interface ApprovalRequestProps {
  setStage: Dispatch<SetStateAction<StageState>>;
  id: string;
  type: 'school' | 'charity';
  name: string;
  la: string;
  user: RequestUser;
  charity?: { mainAddress: string; about: string };
}

export interface JoinRequestsProps {
  setStage: React.Dispatch<React.SetStateAction<StageState>>;
  setSchoolOrCharityProperties: React.Dispatch<React.SetStateAction<SchoolOrCharityProperties>>;
  data?: GetJoinRequestsQuery;
}
