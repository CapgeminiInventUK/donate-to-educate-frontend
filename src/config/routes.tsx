import Paths from './paths';
import {
  Home,
  AboutUs,
  Contact,
  NotFound,
  AccessabilityStatement,
  PrivacyPolicy,
  TermsAndConditions,
  Login,
  AdminDashboard,
  AdminDashboardManageLocalAuthorities,
  AdminDashboardViewLocalAuthority,
  AdminDashboardLocalAuthoritySignUp,
  AdminDashboardLocalAuthoritySignUpConfirmation,
  AdminDashboardRequests,
  ResetPassword,
  AddUser,
  LocalAuthorityDashboard,
  SchoolEdit,
  SignUpCharity,
  SignUpSchool,
  SchoolsDashboard,
  SchoolAdminDashboard,
  Join,
  LocalAuthorityJoinInfo,
  FindYourCommunity,
  YourLocalArea,
  HowItWorks,
  AdminDashboardManageSchools,
  AdminDashboardManageCharities,
  LocalAuthorityDashboardSchools,
  LocalAuthorityDashboardCharities,
  RequestSchoolProducts,
  SchoolDashboardItems,
  SchoolContactConfirmation,
  DeleteConfirmation,
  Donate,
  FindSchools,
  FindCharities,
  SignIn,
} from './lazy';
import { Route } from '@/types/props';

const routes: Route[] = [
  {
    path: Paths.HOME,
    element: <Home />,
    name: 'Home',
  },
  {
    path: Paths.SCHOOLS_CREATE_EDIT_PROFILE,
    element: <></>,
    name: 'Create or edit your profile',
    authType: 'school',
  },
  {
    path: Paths.CHARITIES_CREATE_EDIT_PROFILE,
    element: <></>,
    name: 'Create or edit your profile',
    authType: 'charity',
  },
  {
    path: Paths.ABOUT,
    element: <AboutUs />,
    name: 'About',
  },
  {
    path: Paths.HOW_IT_WORKS,
    element: <HowItWorks />,
    name: 'How it works',
  },
  {
    path: Paths.CONTACT,
    element: <Contact />,
    name: 'Contact',
  },
  {
    path: Paths.ACCESSABILITY_STATEMENT,
    element: <AccessabilityStatement />,
  },
  {
    path: Paths.PRIVACY_POLICY,
    element: <PrivacyPolicy />,
  },
  {
    path: Paths.TERMS_AND_CONDITIONS,
    element: <TermsAndConditions />,
  },
  {
    path: Paths.DONATE,
    element: <Home />,
    name: 'Donate',
  },
  {
    path: Paths.SCHOOLS_DASHBOARD,
    element: <SchoolsDashboard />,
  },
  {
    path: Paths.REQUEST_SCHOOL_PRODUCTS,
    element: <RequestSchoolProducts />,
    name: 'Request',
  },
  {
    path: Paths.LOGIN,
    element: <Login />,
    name: 'Sign in or join',
  },
  {
    path: Paths.SIGN_IN,
    element: <SignIn />,
    name: 'Sign in or join',
  },
  {
    path: Paths.ADMIN_DASHBOARD,
    element: <AdminDashboard />,
    authType: 'admin',
  },
  {
    path: Paths.ADMIN_DASHBOARD_LA_MANAGE,
    element: <AdminDashboardManageLocalAuthorities />,
    authType: 'admin',
  },
  {
    path: Paths.ADMIN_DASHBOARD_LA_VIEW,
    element: <AdminDashboardViewLocalAuthority />,
    authType: 'admin',
  },
  {
    path: Paths.ADMIN_DASHBOARD_SCHOOL,
    element: <SchoolAdminDashboard />,
    authType: 'school',
  },
  {
    path: Paths.ADMIN_DASHBOARD_SIGN_UP,
    element: <AdminDashboardLocalAuthoritySignUp />,
    authType: 'admin',
  },
  {
    path: Paths.ADMIN_DASHBOARD_SIGN_UP_CONFIRMATION,
    element: <AdminDashboardLocalAuthoritySignUpConfirmation />,
    authType: 'admin',
  },
  {
    path: Paths.ADMIN_DASHBOARD_REQUESTS,
    element: <AdminDashboardRequests />,
    authType: 'admin',
  },
  {
    path: Paths.LOCAL_AUTHORITY_DASHBOARD,
    element: <LocalAuthorityDashboard />,
    authType: 'localAuthority',
  },
  {
    path: Paths.LOCAL_AUTHORITY_DASHBOARD_SCHOOLS,
    element: <LocalAuthorityDashboardSchools />,
    authType: 'localAuthority',
  },
  {
    path: Paths.LOCAL_AUTHORITY_DASHBOARD_CHARITIES,
    element: <LocalAuthorityDashboardCharities />,
    authType: 'localAuthority',
  },
  {
    path: Paths.SCHOOL_EDIT,
    element: <SchoolEdit />,
    authType: 'school',
  },
  {
    path: Paths.ADD_USER,
    element: <AddUser />,
  },
  {
    path: Paths.SIGN_UP_CHARITY,
    element: <SignUpCharity />,
  },
  {
    path: Paths.SIGN_UP_SCHOOL,
    element: <SignUpSchool />,
  },
  {
    path: Paths.RESET_PASSWORD,
    element: <ResetPassword />,
  },
  {
    path: Paths.JOIN,
    element: <Join />,
  },
  {
    path: Paths.LOCAL_AUTHORITY_JOIN_INFO,
    element: <LocalAuthorityJoinInfo />,
  },
  {
    path: Paths.FIND_YOUR_COMMUNITY,
    element: <FindYourCommunity />,
    name: 'Find your community',
  },
  {
    path: Paths.ADMIN_DASHBOARD_MANAGE_SCHOOLS,
    element: <AdminDashboardManageSchools />,
  },
  {
    path: Paths.ADMIN_DASHBOARD_MANAGE_CHARITIES,
    element: <AdminDashboardManageCharities />,
  },
  {
    path: Paths.SCHOOLS_DASHBOARD_ITEMS,
    element: <SchoolDashboardItems />,
  },
  {
    path: Paths.DELETE_CONFIRMATION,
    element: <DeleteConfirmation />,
    authType: 'admin',
  },
  { path: Paths.SCHOOLS_DASHBOARD_ITEMS_CONFIRMATION, element: <SchoolContactConfirmation /> },
  { path: Paths.YOUR_LOCAL_AREA, element: <YourLocalArea /> },
  { path: Paths.LOCAL_SCHOOLS, element: <FindSchools /> },
  { path: Paths.LOCAL_CHARITIES, element: <FindCharities /> },
  { path: Paths.LOCAL_DONATE, element: <Donate /> },
  {
    path: Paths.ALL,
    element: <NotFound />,
  },
];

export default routes;
