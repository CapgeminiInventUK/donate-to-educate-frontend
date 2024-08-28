import { Dispatch, FormEvent, ReactNode, RefObject, SetStateAction } from 'react';
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
  SchoolOrCharityTableData,
  SchoolOrCharityProperties,
  RequestUser,
  AccountType,
  Banner,
  FormComponent,
  SummaryPageColour,
  ResultType,
  myStageType,
  ItemsIconType,
  PillColours,
  InstitutionProfile,
  RequestFormState,
  UserDetails,
  InstitutionType,
} from './data';
import Paths from '@/config/paths';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { GraphQLQuery, GraphQLResult } from 'aws-amplify/api';
import {
  CharityProfile,
  GetJoinRequestsQuery,
  GetSchoolQuery,
  InsertJoinRequestMutationVariables,
  JoinRequest,
  ProfileItems,
  SchoolProfile,
  SearchResult,
  UpdateCharityProfileMutation,
  UpdateSchoolProfileMutation,
  UpdateUserMutation,
} from './api';
import { InputRef } from 'antd';
import { NavigateFunction } from 'react-router-dom';

export interface LayoutProps {
  header?: ReactNode;
  footer?: ReactNode;
  page: ReactNode;
}

export type TileThemes = 'lightBlue' | 'midBlue' | 'darkBlue' | 'grey';

export type Themes =
  | 'darkBlue'
  | 'midBlue'
  | 'link'
  | 'link-blue'
  | 'link-blue-bold'
  | 'outline-light'
  | 'light';

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

export interface CloseButtonProps {
  onClick: () => void;
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
  children?: ReactNode;
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
  hover?: boolean;
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

export interface HeroBannerProps {
  onGetInvolvedClick: () => void;
}

export interface PillProps {
  colour: PillColours;
  text?: string;
}

export interface CookiesSelection {
  selection: 'consented' | 'rejected';
}

export interface NavLinksProps {
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
  authType?: AccountType | AccountType[];
}

export interface NavLinkProps {
  path: Paths;
  name?: string;
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
  labels: string[];
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
  homepageLink?: boolean;
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
  className?: string;
}

export interface TextInputSearchProps extends TextInputProps {
  onClick: () => void;
}

export interface MultiStepFormProps {
  formTemplate: FormTemplate[];
  formData: FormDataItem[];
  pageNumber: number;
  setPageNumber: Dispatch<SetStateAction<number>>;
  setFormSubmitted?: Dispatch<SetStateAction<boolean>>;
  setHappyPathTemplate?: () => void;
  isLoading?: boolean;
  onChange: (
    value: string | boolean,
    formMeta: FormMeta | undefined,
    fullValue?: Record<string, string | boolean>
  ) => void;
  isSchoolRegistered?: boolean;
  hasActiveJoinRequest?: boolean;
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
  colour?: 'white' | 'blue';
}

export type InternalLinkProps = ExternalLinkProps;

export interface FormIntroPageProps {
  header: string;
  infoText: string;
  listItems?: string[];
  secondaryHeading?: string;
  secondaryInfoText?: string;
  secondaryListItems?: string[];
}

export interface CheckYourAnswersProps {
  sections: FormSections[];
  formName: FormNames;
  formData?: FormDataItem[];
  setPageNumber?: Dispatch<SetStateAction<number>>;
}

export interface SummaryProps {
  icon?: JSX.Element;
  header: string;
  body: string[];
  logo?: JSX.Element;
  subHeading?: string;
  infoText?: string;
}

export interface InstitutionBannerProps {
  isAdminView?: boolean;
  banner: Banner;
  setBanner?: Dispatch<SetStateAction<Banner>>;
  type: InstitutionType;
  name?: string;
  postcode?: string;
  isPublic?: boolean;
}

export interface InformationTileProps {
  heading: string;
  subtext: string;
  dismiss?: () => void;
}

export interface EditableInformationTileProps {
  heading: string;
  editContent: () => void;
  onCancel: () => void;
  saveOnClick: () => void;
  isEditing: boolean;
  text: string;
  setText: (text: string) => void;
}

export interface ActionTileProps {
  icon: JSX.Element;
  heading: string;
  subheading?: string;
  buttonText: string;
  theme: TileThemes;
  isAdmin?: boolean;
  onClick: () => void;
}

export interface AddressInsetProps {
  formData: FormDataItem[];
  componentData: ComponentDataPropsType;
}

export interface FormErrorsProps {
  formErrors: Record<string, string>;
}

export interface SchoolsOrCharityTableProps {
  data: SchoolOrCharityTableData[];
  setStage?: Dispatch<SetStateAction<StageState>>;
  setProperties?: Dispatch<SetStateAction<SchoolOrCharityProperties>>;
}

export interface SchoolsTablesProps {
  localAuthority: string;
  setSchoolsNumber: Dispatch<SetStateAction<number>>;
  setStage: Dispatch<SetStateAction<StageState>>;
  schoolProperties?: SchoolOrCharityProperties;
  setSchoolProperties?: Dispatch<SetStateAction<SchoolOrCharityProperties>>;
  stage: StageState;
}

export interface CharitiesTablesProps {
  localAuthority: string;
  setCharitiesNumber: Dispatch<SetStateAction<number>>;
  setStage: Dispatch<SetStateAction<StageState>>;
  charityProperties?: SchoolOrCharityProperties;
  setCharityProperties?: Dispatch<SetStateAction<SchoolOrCharityProperties>>;
  stage: StageState;
}

export interface ApprovalRequestProps {
  setStage: Dispatch<SetStateAction<StageState>>;
  id: string;
  type: InstitutionType;
  name: string;
  la: string;
  urn?: string;
  user: RequestUser;
  charity?: { charityAddress: string; aboutCharity: string };
}

export interface JoinRequestsProps {
  setStage: Dispatch<SetStateAction<StageState>>;
  setSchoolOrCharityProperties: Dispatch<SetStateAction<SchoolOrCharityProperties>>;
  data?: GetJoinRequestsQuery;
}

export interface JoinRequestsTableProps {
  setStage: Dispatch<SetStateAction<StageState>>;
  setSchoolOrCharityProperties: Dispatch<SetStateAction<SchoolOrCharityProperties>>;
  title: string;
  dataIndex: string;
  data?: JoinRequest[];
  h2: string;
  firstColumnBold?: boolean;
}

export interface DeclineDeleteModalProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  showModal: boolean;
  onConfirm: () => void;
  bodyText: string;
  confirmText: string;
}

export interface InstitutionAdminDashboardProps {
  type: InstitutionType;
  name: string;
  profile: SchoolProfile | CharityProfile;
}

export interface EditModeItemProps {
  icon: JSX.Element;
  itemName: string;
  item: string | undefined;
  setBanner?: Dispatch<SetStateAction<Banner>>;
  placeholder: string;
}

export interface AdminViewProps {
  banner: Banner;
  type: InstitutionType;
  editMode: boolean;
  setBanner?: Dispatch<SetStateAction<Banner>>;
}

export interface BannerItemProps {
  icon: JSX.Element;
  item: string | undefined;
  itemType: string;
  defaultText: string;
}

export interface CardProps {
  children: ReactNode;
  className?: string;
}

export interface ItemSelectionProps {
  schoolOrCharity: InstitutionType;
  items: Record<number, string[]>;
  whatToExpect: string;
  actionText: string;
  id: string;
  name: string;
  previewMode?: boolean;
  postcode?: string;
}

export interface AdminDashboardCardProps {
  title: string;
  icon?: JSX.Element;
  body: string;
  amount?: number;
  totalAmount?: number;
  subBody: string;
  onClick: () => void;
  stats?: number[];
  className: string;
}

export interface RequestItemsProps {
  type: ItemsIconType;
  organisationType: InstitutionType;
  id: string;
  name: string;
}

export interface RequestItemsFormProps {
  type: ItemsIconType;
  organisationType: InstitutionType;
  formState: RequestFormState;
  onFormChange: (key: string, value: string) => void;
  onFormSubmit: (event: FormEvent<Element>) => void;
}

export interface DonateAndExcessProps {
  type: 'donate' | 'excess';
  postcode: string;
  hasState: boolean;
}

export interface getColumnSearchProps<T> {
  dataIndex: keyof T;
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  searchedColumn: string;
  setSearchedColumn: Dispatch<SetStateAction<string>>;
  searchInput: RefObject<InputRef>;
  filterClassName: string;
  dashboardLink?: Paths;
  navigate?: NavigateFunction;
  buttonClassName?: string;
  postcode?: string;
  firstColumnBold?: boolean;
}

export interface FormHeaderProps {
  formErrors: Record<string, string>;
  pageNumber: number;
  isUnhappyPath?: boolean;
  formTemplate: FormTemplate[];
  logo?: JSX.Element;
  header: ReactNode;
  infoText?: string;
  infoTextTwo?: string;
  subHeader?: JSX.Element;
  secondaryHeader?: string;
}

export interface FormFieldsProps {
  formComponents: FormComponent[];
  formErrors: Record<string, string>;
  formData: FormDataItem[];
  setPageNumber: Dispatch<SetStateAction<number>>;
  onChange: (
    value: string | boolean,
    formMeta: FormMeta | undefined,
    fullValue?: Record<string, string | boolean> | undefined
  ) => void;
  isUnhappyPath?: boolean;
}

export interface FormButtonsProps {
  isLastPage?: boolean;
  isUnhappyPath?: boolean;
  isSchoolRegistered?: boolean;
  declarationSigned?: boolean;
  summaryPageBg: SummaryPageColour;
  pageNumber: number;
  cyaPageNumber?: number;
  onLocalAuthorityRegisterRequest?: () => void;
  formComponentInternalLink?: ButtonProps;
}

export interface ProductsTableProps {
  tableData: SearchResult[];
  type: InstitutionType;
  iconColour: string;
  productsColumnHeader:
    | 'Product types available'
    | 'Excess stock product types'
    | 'Product types needed';
  postcode?: string;
  hideNotJoined?: boolean;
  hideNoProducts?: boolean;
  hideStatus?: boolean;
}

export interface FindCharityTableProps {
  title?: string;
  postcode: string;
  type?: InstitutionType;
}

export interface LocationStateOrRedirectProps<T> {
  state: T;
  hasState: boolean;
}

export interface PublicDashboardProps {
  type: InstitutionType;
  profile?: InstitutionProfile;
  setPreview?: (value: boolean) => void;
  previewMode?: boolean;
}

export interface ResultBannerProps {
  type: ResultType;
  name?: string;
}

export interface BackButtonProps {
  onClick?: () => void;
  className?: string;
  theme: 'white' | 'blue';
}

export interface ErrorBoundaryWithLocationProps {
  name: ErrorBoundaryType;
  children: JSX.Element;
}

export interface ErrorPageProps {
  icon: JSX.Element;
  title: string;
  message: JSX.Element;
}

export interface SchoolAlreadyRegisteredProps {
  type: 'registered' | 'joinRequest';
}

export interface ItemListProps {
  type: ItemsIconType;
  items?: Record<number, string[]>;
}

export interface TileProps {
  title: string;
  onClick?: () => void;
  body: string[];
  icon: JSX.Element;
  size: string;
  children?: React.ReactNode;
  noShadow?: boolean;
  hoverScale?: number;
  titleLarge?: boolean;
}

export interface HomeTileProps {
  title: string;
  onClick: () => void;
  body: string[];
  icon: JSX.Element;
  buttonText: string;
}

export interface UserRequestDetailsProps {
  type: InstitutionType;
  user: RequestUser;
  setMyStage: Dispatch<SetStateAction<myStageType>>;
  charity?: {
    charityAddress: string;
    aboutCharity: string;
  };
  charityName?: string;
  la?: string;
}

export interface SchoolDetailsProps {
  data: GraphQLQuery<GetSchoolQuery>;
}

export interface MapProps {
  markers: { coordinates: number[]; name: string; colour: string }[];
  initialZoom?: number;
  initialCoordinates: number[];
}

export interface PopupInfo {
  latitude: number;
  longitude: number;
  name: string;
}

export interface EditableDashboardProps {
  banner: Banner;
  setBanner: Dispatch<SetStateAction<Banner>>;
  type: InstitutionType;
  name: string;
  about: string;
  setAbout: Dispatch<SetStateAction<string>>;
  setPreview: Dispatch<SetStateAction<boolean>>;
  profile: SchoolProfile | CharityProfile;
  placeholderAboutText: string;
}

export interface ActionTilesProps {
  profile: SchoolProfile | CharityProfile;
  type: InstitutionType;
}

export interface PublicViewProps {
  banner: Banner;
  type: InstitutionType;
}

export interface ItemListEditProps {
  setItems: Dispatch<SetStateAction<Record<number, string[]>>>;
  items: Record<number, string[]>;
}

export interface LogoutButtonProps {
  className?: string;
}

export interface NoLocalOrganisationsProps {
  organisationName?: string;
}

export interface PrivateRouteProps {
  route?: string;
  children: ReactNode;
  authType?: AccountType | AccountType[];
}

export interface ProductTypeIconProps {
  productType: number;
  colour: string;
}

export interface PublicDashboardActionTilesProps {
  request?: ProfileItems | null;
  donate?: ProfileItems | null;
  excess?: ProfileItems | null;
  type: InstitutionType;
  name: string;
  id: string;
  previewMode?: boolean;
  postcode?: string | null;
}

export interface InfoTableProps {
  originalTableValues: Record<string, string>;
  editableKeys?: string[];
  isAccounts?: boolean;
  isDelete?: boolean;
  title?: string;
  icon?: JSX.Element;
  className?: string;
  rowClassName?: string;
  onEdit?: () => void;
  onDelete?: (key: string) => Promise<void>;
  onChange?: (key: string, value: string) => void;
  refetch?: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<GraphQLResult<GraphQLQuery<UpdateUserMutation>>, Error>>;
}

export interface EditingRowProps {
  originalTableValues: Record<string, string>;
  field: string;
  value: string;
  setNewTableValues: Dispatch<SetStateAction<Record<string, string>>>;
  setEditingKey: Dispatch<SetStateAction<string | undefined>>;
  onChange: ((key: string, value: string) => void) | undefined;
  refetch?: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<GraphQLResult<GraphQLQuery<UpdateUserMutation>>, Error>>;
}

export interface ManageDetailsSectionProps {
  userData: UserDetails;
  type?: AccountType;
}

export interface ManageInstitutionSectionProps {
  type?: AccountType | '';
}

export interface ShowHideProps {
  onChangePasswordVisibility: (show: boolean) => void;
}

export interface ManageInstitutionsTableProps {
  data: InstitutionProfile[];
  type: InstitutionType;
  isLoading?: boolean;
}

export interface InstitutionAdminViewProps {
  postcode: string;
  name: string;
  type: InstitutionType;
}

export interface ProductsListPageProps {
  type: ItemsIconType;
  institutionType: InstitutionType;
  path: Paths;
  items: Record<number, string[]>;
  setItems: Dispatch<SetStateAction<Record<number, string[]>>>;
  content: ContentType;
  setContent: Dispatch<SetStateAction<ContentType>>;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<
    QueryObserverResult<
      GraphQLResult<GraphQLQuery<UpdateSchoolProfileMutation | UpdateCharityProfileMutation>>,
      Error
    >
  >;
}
export interface RequestDonateNextStepsProps {
  institutionType: InstitutionType;
  content: ContentType;
  setContent: Dispatch<SetStateAction<ContentType>>;
  saveDisabled: boolean;
  setSaveDisabled: Dispatch<SetStateAction<boolean>>;
  path: Paths;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<
    QueryObserverResult<
      GraphQLResult<GraphQLQuery<UpdateSchoolProfileMutation | UpdateCharityProfileMutation>>,
      Error
    >
  >;
}

export interface PostcodeEditProps {
  postcode: string;
  name: string;
}
