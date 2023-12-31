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
  Form,
  ResetPassword,
  AddUser,
  LocalAuthorityDashboard,
  SchoolEdit,
} from './lazy';

const routes = [
  {
    path: Paths.HOME,
    element: <Home />,
    name: 'Home',
  },
  {
    path: Paths.ABOUT,
    element: <AboutUs />,
    name: 'About us',
  },
  {
    path: Paths.CONTACT,
    element: <Contact />,
    name: 'Contact us',
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
    path: Paths.LOGIN,
    element: <Login />,
    name: 'Login',
  },
  {
    path: Paths.ADMIN_DASHBOARD,
    element: <AdminDashboard />,
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
    path: Paths.FORM,
    element: <Form />,
  },
  {
    path: Paths.RESET_PASSWORD,
    element: <ResetPassword />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
