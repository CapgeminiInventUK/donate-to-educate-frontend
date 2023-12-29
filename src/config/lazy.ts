import { lazy } from 'react';

const Home = lazy(() => import('@pages/Home/Home'));
const AboutUs = lazy(() => import('@pages/AboutUs/AboutUs'));
const Contact = lazy(() => import('@pages/Contact/Contact'));
const Form = lazy(() => import('@pages/Form/Form'));
const AccessabilityStatement = lazy(
  () => import('@pages/AccessibilityStatement/AccessibilityStatement')
);
const PrivacyPolicy = lazy(() => import('@pages/PrivacyPolicy/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('@pages/TermsAndConditions/TermsAndConditions'));
const Login = lazy(() => import('@pages/Login/Login'));
const AdminDashboard = lazy(() => import('@pages/AdminDashboard/AdminDashboard'));
const AdminDashboardManageLocalAuthorities = lazy(
  () => import('@pages/AdminDashboard/ManageLocalAuthorities/ManageLocalAuthorities')
);
const AdminDashboardViewLocalAuthority = lazy(
  () => import('@pages/AdminDashboard/ViewLocalAuthority/ViewLocalAuthority')
);
const AdminDashboardLocalAuthoritySignUp = lazy(
  () => import('@pages/AdminDashboard/LocalAuthoritySignUp/LocalAuthoritySignUp')
);
const AdminDashboardLocalAuthoritySignUpConfirmation = lazy(
  () =>
    import(
      '@pages/AdminDashboard/LocalAuthoritySignUp/LocalAuthoritySignUpConfirmation/LocalAuthoritySignUpConfirmation'
    )
);
const AdminDashboardRequests = lazy(() => import('@pages/AdminDashboard/Requests/Requests'));
const LocalAuthorityDashboard = lazy(
  () => import('@pages/LocalAuthorityDashboard/LocalAuthorityDashboard')
);
const NotFound = lazy(() => import('@pages/NotFound/NotFound'));
const ResetPassword = lazy(() => import('@/pages/ResetPassword/ResetPassword'));
const AddUser = lazy(() => import('@/pages/AddUser/AddUser'));
const SchoolEdit = lazy(() => import('@/pages/School/Admin/SchoolEdit'));

export {
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
  Form,
  ResetPassword,
  AddUser,
  LocalAuthorityDashboard,
  SchoolEdit,
};
