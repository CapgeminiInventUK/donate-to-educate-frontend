import { lazy } from 'react';

const Home = lazy(() => import('@pages/Home/Home'));
const AboutUs = lazy(() => import('@pages/AboutUs/AboutUs'));
const Contact = lazy(() => import('@pages/Contact/Contact'));
const SignUpCharity = lazy(() => import('@pages/SignUpCharity/SignUpCharity'));
const SignUpSchool = lazy(() => import('@pages/SignUpSchool/SignUpSchool'));
const Join = lazy(() => import('@pages/Join/Join'));
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
const AdminDashboardManageSchools = lazy(
  () => import('@pages/AdminDashboard/ManageSchools/ManageSchools')
);
const AdminDashboardManageCharities = lazy(
  () => import('@pages/AdminDashboard/ManageCharities/ManageCharities')
);
const LocalAuthorityDashboard = lazy(
  () => import('@pages/LocalAuthorityDashboard/LocalAuthorityDashboard')
);
const LocalAuthorityDashboardSchools = lazy(
  () => import('@pages/LocalAuthorityDashboard/ManageSchools/ManageSchools')
);
const LocalAuthorityDashboardCharities = lazy(
  () => import('@pages/LocalAuthorityDashboard/ManageCharities/ManageCharities')
);

const SchoolAdminDashboard = lazy(() => import('@pages/School/Admin/SchoolAdminDashboard'));
const SchoolsDashboard = lazy(() => import('@pages/SchoolsDashboard/SchoolsDashboard'));
const SchoolDashboardItems = lazy(() => import('@/pages/SchoolsDashboard/Edit/SchoolEdit'));
const SchoolContactConfirmation = lazy(
  () => import('@/pages/SchoolsDashboard/Confirmation/SchoolContactConfirmation')
);

const NotFound = lazy(() => import('@pages/NotFound/NotFound'));
const ResetPassword = lazy(() => import('@/pages/ResetPassword/ResetPassword'));
const AddUser = lazy(() => import('@/pages/AddUser/AddUser'));
const SchoolEdit = lazy(() => import('@/pages/School/Admin/SchoolEdit'));
const HowItWorks = lazy(() => import('@/pages/HowItWorks/HowItWorks'));

const LocalAuthorityJoinInfo = lazy(
  () => import('@/pages/LocalAuthorityJoinInfo/LocalAuthorityJoinInfo')
);

const FindYourCommunity = lazy(() => import('@/pages/FindYourCommunity/FindYourCommunity'));
const YourLocalArea = lazy(() => import('@/pages/YourLocalArea/YourLocalArea'));
const Donate = lazy(() => import('@/pages/YourLocalArea/Donate/Donate'));
const FindSchools = lazy(() => import('@/pages/YourLocalArea/FindSchool/FindSchool'));
const FindCharities = lazy(() => import('@/pages/YourLocalArea/FindCharity/FindCharity'));
const RequestSchoolProducts = lazy(
  () => import('@/pages/SchoolsDashboard/RequestProducts/RequestProducts')
);
const DeleteConfirmation = lazy(
  () =>
    import('@/pages/AdminDashboard/Requests/ApprovalRequest/DeleteConfirmation/DeleteConfirmation')
);

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
  AdminDashboardManageSchools,
  AdminDashboardManageCharities,
  SignUpCharity,
  SignUpSchool,
  ResetPassword,
  AddUser,
  LocalAuthorityDashboard,
  SchoolAdminDashboard,
  SchoolEdit,
  SchoolsDashboard,
  Join,
  LocalAuthorityJoinInfo,
  FindYourCommunity,
  YourLocalArea,
  HowItWorks,
  LocalAuthorityDashboardSchools,
  LocalAuthorityDashboardCharities,
  RequestSchoolProducts,
  SchoolDashboardItems,
  SchoolContactConfirmation,
  DeleteConfirmation,
  Donate,
  FindCharities,
  FindSchools,
};
