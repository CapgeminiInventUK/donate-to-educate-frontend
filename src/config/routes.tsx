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
  Join,
  LocalAuthorityJoinInfo,
  FindYourCommunity,
  YourLocalArea,
  HowItWorks,
  AdminDashboardManageSchools,
  AdminDashboardManageCharities,
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
    requiresAuth: true,
    redirectRoute: '/login',
  },
  {
    path: Paths.CHARITIES_CREATE_EDIT_PROFILE,
    element: <></>,
    name: 'Create or edit your profile',
    requiresAuth: true,
    redirectRoute: '/login',
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
    path: Paths.LOGIN,
    element: <Login />,
    name: 'Sign in or join',
  },
  {
    path: Paths.ADMIN_DASHBOARD,
    element: <AdminDashboard />,
    requiresAuth: true,
    redirectRoute: '/login',
  },
  {
    path: Paths.ADMIN_DASHBOARD_LA_MANAGE,
    element: <AdminDashboardManageLocalAuthorities />,
    requiresAuth: true,
    redirectRoute: '/login',
  },
  {
    path: Paths.ADMIN_DASHBOARD_LA_VIEW,
    element: <AdminDashboardViewLocalAuthority />,
    requiresAuth: true,
    redirectRoute: '/login',
  },
  {
    path: Paths.ADMIN_DASHBOARD_SIGN_UP,
    element: <AdminDashboardLocalAuthoritySignUp />,
    requiresAuth: true,
    redirectRoute: '/login',
  },
  {
    path: Paths.ADMIN_DASHBOARD_SIGN_UP_CONFIRMATION,
    element: <AdminDashboardLocalAuthoritySignUpConfirmation />,
    requiresAuth: true,
    redirectRoute: '/login',
  },
  {
    path: Paths.ADMIN_DASHBOARD_REQUESTS,
    element: <AdminDashboardRequests />,
    requiresAuth: true,
    redirectRoute: '/login',
  },
  {
    path: Paths.LOCAL_AUTHORITY_DASHBOARD,
    element: <LocalAuthorityDashboard />,
    requiresAuth: true,
    redirectRoute: '/login',
  },
  {
    path: Paths.SCHOOL_EDIT,
    element: <SchoolEdit />,
    requiresAuth: true,
    redirectRoute: '/login',
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
  { path: Paths.YOUR_LOCAL_AREA, element: <YourLocalArea /> },
  { path: Paths.LOCAL_SCHOOLS, element: <></> },
  { path: Paths.LOCAL_CHARITIES, element: <></> },
  { path: Paths.LOCAL_DONATE, element: <></> },
  {
    path: Paths.ALL,
    element: <NotFound />,
  },
];

export default routes;
