import { ErrorInfo, ReactNode } from 'react';
import {
  ButtonProps,
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
import Paths from '@/config/paths';
import { CharityProfileHeader, Point, ProfileItems, SchoolProfileHeader } from './api';

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  location?: string;
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
  field?: string;
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
  header?: ReactNode;
  subHeader?: ReactNode;
  secondaryHeader?: ReactNode;
  infoText?: string;
  infoTextTwo?: string;
  logo?: JSX.Element;
  footerLogo?: JSX.Element;
  isUnhappyPath?: boolean;
  summaryPageBg?: SummaryPageColour;
  formComponentInternalLink?: ButtonProps;
  onLocalAuthorityRegisterRequest?: () => void;
  isDeclarationPage?: boolean;
}

export enum SummaryPageColour {
  WHITE = 'white',
  BLUE = 'blue',
}

export interface FormMeta {
  page?: number;
  field?: string;
  section?: FormSections;
}

export interface FormDataItem {
  field: string;
  value: string | boolean;
  page?: number;
  section?: FormSections;
  fullValue?: Record<string, string | boolean>;
}

export enum FormSections {
  CHARITY_SECTION = 'Your charity or volunteer group',
  YOUR_DETAILS_SECTION = 'Your details',
  DECLARATION = 'Declaration',
}

export enum FormNames {
  CHARITY = 'Sign up charity',
  SCHOOL = 'Sign up school',
  AUTHORITY = 'Sign up Authority',
}

export enum FormErrors {
  EMAIL_ERROR_MESSAGE = 'Enter the email address in the correct format, like team@donatetoeducate.org.uk',
  PHONE_ERROR_MESSAGE = 'Enter a UK phone number in the correct format, like 07123456789',
  POSTCODE_ERROR_MESSAGE = 'Enter the postcode in the correct format, like LL70 9DJ',
  POSTCODE_NOT_FOUND = 'Postcode not found',
  TEXTAREA_MAX_LENGTH = 'Enter no more than 1000 characters',
}

export interface FormState {
  firstName: string;
  lastName: string;
  jobTitle: string;
  department: string;
  email: string;
  phone: string;
  notes: string;
}

export interface RequestFormState {
  name: string;
  email: string;
  phone: string;
  message: string;
  who: string;
  connection?: string;
}

export enum ComponentType {
  TEXT = 'textInput',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  TEXTAREA = 'textArea',
  DROPDOWN = 'dropdown',
  INTRO = 'intro',
  SCHOOL_NOT_FOUND = 'schoolNotFound',
  CYA = 'checkYourAnswers',
  SUMMARY = 'summaryPage',
}

export interface DropdownOption {
  value: string;
  label: string;
  name?: string;
  postcode?: string;
  registered?: boolean;
}

export interface FilterDropdownOption {
  value: string;
  label: string;
  data: DropdownOption;
}

export interface NavRoute {
  path: Paths;
  childNavRoutes?: NavRoute[];
}

export interface SubmittedFormData {
  name: string;
  email: string;
  jobTitle: string;
  school?: string | null;
  phone?: string | null;
  charityName?: string | null;
  charityAddress?: string | null;
  aboutCharity?: string | null;
  message?: string;
  urn?: string;
  postcode?: string;
}

export interface SchoolOrCharityTableData {
  name: string;
  status: string;
  id?: string;
  urn?: string;
  joinRequestName?: string;
  jobTitle?: string | null;
  email?: string;
  phone?: string | null;
  charityAddress?: string | null;
  aboutCharity?: string | null;
}

export type myStageType = 'deciding' | 'approved' | 'denied';

export enum StageState {
  VIEW = 'view_requests',
  REMOVE = 'remove_school',
  APPROVE_SCHOOL = 'request_approval_school',
  APPROVE_CHARITY = 'request_approval_charity',
  REMOVED = 'removed',
}

export interface SchoolOrCharityProperties {
  id: string;
  name: string;
  la: string;
  user: RequestUser;
  urn?: string;
  charity?: { charityAddress: string; aboutCharity: string };
}

export interface RequestUser {
  name: string;
  title: string;
  email: string;
  phone: string;
}

export interface CustomAttributes {
  'custom:type': string;
  'custom:institution': string;
  'custom:institutionId': string;
}

export type AccountType = 'admin' | 'charity' | 'school' | 'localAuthority';

export interface Banner {
  phone?: string;
  email?: string;
  website?: string;
  uniformPolicy?: string;
  address?: string;
}

export type ResultType = 'declined' | 'approved';

export interface SignUpParameters {
  password: string;
  email: string;
  type: string;
  name: string;
  id: string;
}

export interface ConfirmSignUpParameters {
  email: string;
  code: string;
}

export type ItemsIconType = 'tick' | 'heart' | 'plus';

export type SectionsIconType =
  | 'Clothing and uniform'
  | 'Sports'
  | 'Art and music'
  | 'Study'
  | 'Toiletries'
  | 'Computing and technology';

export interface ItemList {
  name: SectionsIconType;
  items: string[];
}

export enum PillColours {
  GREEN = 'green',
  BLUE = 'blue',
  YELLOW = 'yellow',
  GREY = 'grey',
  RED = 'red',
  LIGHTBLUE = 'lightBlue',
}

export enum ActionTypes {
  REQUEST = 'request',
  DONATE = 'donate',
  EXCESS = 'excess',
}

export interface InstitutionProfile {
  name: string;
  id: string;
  localAuthority: string;
  postcode?: string | null;
  location?: Point | null;
  header?: CharityProfileHeader | SchoolProfileHeader | null;
  about?: string | null;
  request?: ProfileItems | null;
  donate?: ProfileItems | null;
  excess?: ProfileItems | null;
}

export interface RequestItemsTextContent {
  radioButtonLabels: string[];
  radioButtonValues: string[];
  buttonText: string;
  heading: string;
  subHeading: string;
  notesHeading: string;
  notesSubHeading: string;
}

export interface UserDetails {
  name: string;
  jobTitle: string;
  email: string;
  phone: string;
  institutionName?: string;
  id?: string;
  department?: string;
  firstName?: string;
  lastName?: string;
}

export interface ManageUserDetails {
  Name: string;
  Email: string;
  Phone: string;
  'Job title or role': string;
  Department?: string;
}

export enum InstitutionType {
  SCHOOL = 'school',
  CHARITY = 'charity',
}
