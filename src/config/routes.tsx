import type { Route } from '@/types/props';
import {
  AboutUs,
  AccessabilityStatement,
  AddUser,
  AdminDashboard,
  AdminDashboardLocalAuthoritySignUp,
  AdminDashboardLocalAuthoritySignUpConfirmation,
  AdminDashboardManageCharities,
  AdminDashboardManageLocalAuthorities,
  AdminDashboardManageSchools,
  AdminDashboardRequests,
  CharityAdminDashboard,
  CharityAdminView,
  CharityContactConfirmation,
  CharityDashboard,
  CharityDashboardItems,
  CharityEdit,
  Contact,
  CookiePolicy,
  DeleteConfirmation,
  Donate,
  Excess,
  FindCharities,
  FindSchools,
  FindYourCommunity,
  Home,
  HowItWorks,
  Join,
  LocalAuthorityDashboard,
  LocalAuthorityDashboardCharities,
  LocalAuthorityDashboardSchools,
  LocalAuthorityJoinInfo,
  Login,
  NotFound,
  PrivacyPolicy,
  RequestCharityProducts,
  RequestSchoolProducts,
  ResetPassword,
  SchoolAdminDashboard,
  SchoolAdminView,
  SchoolContactConfirmation,
  SchoolDashboardItems,
  SchoolEdit,
  SchoolsDashboard,
  SignIn,
  SignUpCharity,
  SignUpSchool,
  TermsAndConditions,
  YourLocalArea,
} from './lazy';
import Paths from './paths';

const routes: Route[] = [
  // Admin dashboard
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
    path: Paths.ADMIN_DASHBOARD_MANAGE_SCHOOLS,
    element: <AdminDashboardManageSchools />,
    authType: 'admin',
  },
  {
    path: Paths.ADMIN_DASHBOARD_MANAGE_CHARITIES,
    element: <AdminDashboardManageCharities />,
    authType: 'admin',
  },
  {
    path: Paths.DELETE_CONFIRMATION,
    element: <DeleteConfirmation />,
    authType: 'admin',
  },

  // Local Authority Dashboard
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

  // Admin School
  {
    path: Paths.SCHOOL_EDIT,
    element: <SchoolEdit />,
    authType: 'school',
  },
  {
    path: Paths.SCHOOLS_CREATE_EDIT_PROFILE,
    element: <SchoolAdminDashboard />,
    name: 'Create or edit your profile',
    authType: 'school',
  },
  {
    path: Paths.SCHOOL_VIEW,
    element: <SchoolAdminView />,
    authType: 'school',
  },

  // Admin Charity
  {
    path: Paths.CHARITIES_CREATE_EDIT_PROFILE,
    element: <CharityAdminDashboard />,
    name: 'Create or edit your profile',
    authType: 'charity',
  },
  {
    path: Paths.CHARITIES_EDIT,
    element: <CharityEdit />,
    authType: 'charity',
  },
  {
    path: Paths.CHARITIES_VIEW,
    element: <CharityAdminView />,
    authType: 'charity',
  },

  // Login
  {
    path: Paths.LOGIN,
    element: <Login />,
    name: 'Join us',
  },
  {
    path: Paths.SIGN_IN,
    element: <SignIn />,
    name: 'Sign in',
  },
  {
    path: Paths.RESET_PASSWORD,
    element: <ResetPassword />,
  },
  {
    path: Paths.ADD_USER,
    element: <AddUser />,
  },
  {
    path: Paths.JOIN,
    element: <Join />,
  },

  // Public School
  { path: Paths.SCHOOLS_DASHBOARD_ITEMS_CONFIRMATION, element: <SchoolContactConfirmation /> },
  {
    path: Paths.SCHOOLS_DASHBOARD_ITEMS,
    element: <SchoolDashboardItems />,
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
    path: Paths.SIGN_UP_SCHOOL,
    element: <SignUpSchool />,
  },

  // Public Charity
  {
    path: Paths.SIGN_UP_CHARITY,
    element: <SignUpCharity />,
  },
  { path: Paths.REQUEST_CHARITY_PRODUCTS, element: <RequestCharityProducts /> },
  { path: Paths.CHARITY_DASHBOARD, element: <CharityDashboard /> },
  { path: Paths.CHARITY_DASHBOARD_ITEMS, element: <CharityDashboardItems /> },
  { path: Paths.CHARITY_DASHBOARD_ITEMS_CONFIRMATION, element: <CharityContactConfirmation /> },

  // Local Area
  {
    path: Paths.FIND_YOUR_COMMUNITY,
    element: <FindYourCommunity />,
    name: 'Find your community',
  },
  { path: Paths.YOUR_LOCAL_AREA, element: <YourLocalArea /> },
  { path: Paths.LOCAL_SCHOOLS, element: <FindSchools /> },
  { path: Paths.LOCAL_CHARITIES, element: <FindCharities /> },
  { path: Paths.LOCAL_DONATE, element: <Donate /> },
  { path: Paths.LOCAL_EXCESS, element: <Excess /> },

  // Misc
  {
    path: Paths.HOME,
    element: <Home />,
    name: 'Home',
  },
  {
    path: Paths.LOCAL_AUTHORITY_JOIN_INFO,
    element: <LocalAuthorityJoinInfo />,
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
    path: Paths.COOKIE_POLICY,
    element: <CookiePolicy />,
    name: 'How we use cookies',
  },
  {
    path: Paths.CONTACT,
    element: <Contact />,
    name: 'Contact',
  },
  {
    path: Paths.ACCESSIBILITY_STATEMENT,
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
    path: Paths.ALL,
    element: <NotFound />,
  },
];

export default routes;
