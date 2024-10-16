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
  LocalAuthorityJoinInfo,
  FindYourCommunity,
  YourLocalArea,
  HowItWorks,
  AdminDashboardManageSchools,
  AdminDashboardManageSchool,
  AdminDashboardManageCharities,
  AdminDashboardManageCharity,
  LocalAuthorityDashboardSchools,
  LocalAuthorityDashboardCharities,
  LocalAuthorityDashboardManageSchoolUsers,
  LocalAuthorityDashboardManageCharityUsers,
  RequestSchoolProducts,
  SchoolDashboardItems,
  SchoolContactConfirmation,
  DeleteConfirmationBanner,
  Donate,
  FindSchools,
  FindCharities,
  SignIn,
  CharityAdminDashboard,
  CharityDashboard,
  CharityDashboardItems,
  CharityEdit,
  Join,
  RequestCharityProducts,
  CharityContactConfirmation,
  SchoolAdminView,
  CharityAdminView,
  CookiePolicy,
  Excess,
  Settings,
  AdminDashboardLocalAuthorityUsers,
  AddSchoolUser,
  AddCharityUser,
  AddLocalAuthorityUser,
  LocalAuthorityProducts,
  LocalAuthorityDonate,
  LocalAuthorityExcess,
} from './lazy';
import { Route } from '@/types/props';
import { InstitutionType } from '@/types/data';

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
    path: Paths.ADMIN_DASHBOARD_LA_VIEW_USERS,
    element: <AdminDashboardLocalAuthorityUsers />,
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
    path: Paths.ADMIN_DASHBOARD_MANAGE_SCHOOL,
    element: <AdminDashboardManageSchool />,
    authType: 'admin',
  },
  {
    path: Paths.ADMIN_DASHBOARD_MANAGE_CHARITIES,
    element: <AdminDashboardManageCharities />,
    authType: 'admin',
  },
  {
    path: Paths.ADMIN_DASHBOARD_MANAGE_CHARITY,
    element: <AdminDashboardManageCharity />,
    authType: 'admin',
  },
  {
    path: Paths.ADD_SCHOOL_USER,
    element: <AddSchoolUser />,
    authType: ['admin', 'localAuthority', 'school'],
  },
  {
    path: Paths.ADD_CHARITY_USER,
    element: <AddCharityUser />,
    authType: ['admin', 'localAuthority', 'charity'],
  },
  {
    path: Paths.ADD_LOCAL_AUTHORITY_USER,
    element: <AddLocalAuthorityUser />,
    authType: ['admin', 'localAuthority'],
  },
  {
    path: Paths.DELETE_CONFIRMATION,
    element: <DeleteConfirmationBanner />,
    authType: 'admin',
  },

  // Local Authority Dashboard
  {
    path: Paths.LOCAL_AUTHORITY_DASHBOARD,
    element: <LocalAuthorityDashboard />,
    authType: 'localAuthority',
  },
  {
    path: Paths.LOCAL_AUTHORITY_DASHBOARD_PRODUCTS,
    element: <LocalAuthorityProducts />,
    authType: 'localAuthority',
  },
  {
    path: Paths.LOCAL_AUTHORITY_DASHBOARD_DONATE,
    element: <LocalAuthorityDonate />,
    authType: 'localAuthority',
  },
  {
    path: Paths.LOCAL_AUTHORITY_DASHBOARD_EXCESS,
    element: <LocalAuthorityExcess />,
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
    path: Paths.LOCAL_AUTHORITY_DASHBOARD_MANAGE_CHARITY,
    element: <LocalAuthorityDashboardManageCharityUsers />,
    authType: 'localAuthority',
  },
  {
    path: Paths.LOCAL_AUTHORITY_DASHBOARD_MANAGE_SCHOOL,
    element: <LocalAuthorityDashboardManageSchoolUsers />,
    authType: 'localAuthority',
  },

  // Admin School
  {
    path: Paths.SCHOOL_EDIT,
    element: <SchoolEdit />,
    authType: InstitutionType.SCHOOL,
  },
  {
    path: Paths.SCHOOLS_CREATE_EDIT_PROFILE,
    element: <SchoolAdminDashboard />,
    name: 'Create or edit your profile',
    authType: InstitutionType.SCHOOL,
  },
  {
    path: Paths.SCHOOL_VIEW,
    element: <SchoolAdminView />,
    authType: InstitutionType.SCHOOL,
  },

  // Admin Charity
  {
    path: Paths.CHARITIES_CREATE_EDIT_PROFILE,
    element: <CharityAdminDashboard />,
    name: 'Create or edit your profile',
    authType: InstitutionType.CHARITY,
  },
  {
    path: Paths.CHARITIES_EDIT,
    element: <CharityEdit />,
    authType: InstitutionType.CHARITY,
  },
  {
    path: Paths.CHARITIES_VIEW,
    element: <CharityAdminView />,
    authType: InstitutionType.CHARITY,
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
    path: Paths.SETTINGS,
    element: <Settings />,
    name: 'Settings',
    authType: ['localAuthority', 'school', 'charity', 'admin'],
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
