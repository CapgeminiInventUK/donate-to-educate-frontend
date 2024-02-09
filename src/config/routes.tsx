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
} from './lazy';
import { Route } from '@/types/props';

const routes: Route[] = [
  {
    path: Paths.HOME,
    element: <Home />,
    name: 'Home',
  },
  {
    path: Paths.FAMILIES,
    element: <></>,
    name: 'Families',
  },
  {
    path: Paths.SCHOOLS,
    element: <></>,
    name: 'Schools',
  },
  {
    path: Paths.SCHOOLS_CREATE_EDIT_PROFILE,
    element: <></>,
    name: 'Create or edit your profile',
    redirectRoute: '/login',
  },
  {
    path: Paths.SCHOOLS_FIND_COMMUNITIES,
    element: <></>,
    name: 'Find your communities',
  },
  {
    path: Paths.CHARITIES,
    element: <></>,
    name: 'Charities',
  },
  {
    path: Paths.CHARITIES_CREATE_EDIT_PROFILE,
    element: <></>,
    name: 'Create or edit your profile',
    redirectRoute: '/login',
  },
  {
    path: Paths.CHARITIES_FIND_COMMUNITIES,
    element: <></>,
    name: 'Find your communities',
  },
  {
    path: Paths.ABOUT,
    element: <AboutUs />,
    name: 'About',
  },
  {
    path: Paths.HOW_IT_WORKS,
    element: <></>,
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
    path: Paths.ALL,
    element: <NotFound />,
  },
];

export default routes;
