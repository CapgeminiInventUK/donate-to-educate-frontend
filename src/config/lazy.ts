import { lazy } from 'react';

// Misc
export const Home = lazy(() => import('@pages/Home/Home'));
export const AboutUs = lazy(() => import('@pages/AboutUs/AboutUs'));
export const Contact = lazy(() => import('@pages/Contact/Contact'));
export const AccessabilityStatement = lazy(
  () => import('@pages/AccessibilityStatement/AccessibilityStatement')
);
export const PrivacyPolicy = lazy(() => import('@pages/PrivacyPolicy/PrivacyPolicy'));
export const TermsAndConditions = lazy(
  () => import('@pages/TermsAndConditions/TermsAndConditions')
);
export const HowItWorks = lazy(() => import('@/pages/HowItWorks/HowItWorks'));
export const CookiePolicy = lazy(() => import('@/pages/CookiePolicy/CookiePolicy'));
export const LocalAuthorityJoinInfo = lazy(
  () => import('@/pages/LocalAuthorityJoinInfo/LocalAuthorityJoinInfo')
);
export const NotFound = lazy(() => import('@pages/NotFound/NotFound'));

// Public School
export const SignUpSchool = lazy(() => import('@pages/SignUpSchool/SignUpSchool'));
export const SchoolsDashboard = lazy(() => import('@pages/SchoolsDashboard/SchoolsDashboard'));
export const SchoolDashboardItems = lazy(() => import('@/pages/SchoolsDashboard/SchoolEdit'));
export const SchoolContactConfirmation = lazy(
  () => import('@/pages/SchoolsDashboard/SchoolContactConfirmation')
);
export const RequestSchoolProducts = lazy(
  () => import('@/pages/SchoolsDashboard/RequestSchoolProducts')
);

// Public Charity
export const SignUpCharity = lazy(() => import('@pages/SignUpCharity/SignUpCharity'));
export const CharityDashboard = lazy(() => import('@/pages/CharityDashboard/CharityDashboard'));
export const CharityEdit = lazy(() => import('@/pages/CharityDashboard/CharityEdit'));
export const RequestCharityProducts = lazy(
  () => import('@/pages/CharityDashboard/RequestCharityProducts')
);
export const CharityContactConfirmation = lazy(
  () => import('@/pages/CharityDashboard/CharityContactConfirmation')
);

// Login
export const Login = lazy(() => import('@pages/Login/Login'));
export const SignIn = lazy(() => import('@pages/Login/SignIn/SignIn'));
export const ResetPassword = lazy(() => import('@/pages/ResetPassword/ResetPassword'));
export const AddUser = lazy(() => import('@/pages/AddUser/AddUser'));
export const Join = lazy(() => import('@/pages/Join/Join'));

// Admin Dashboard
export const AdminDashboard = lazy(() => import('@pages/AdminDashboard/AdminDashboard'));
export const AdminDashboardManageLocalAuthorities = lazy(
  () => import('@pages/AdminDashboard/ManageLocalAuthorities/ManageLocalAuthorities')
);
export const AdminDashboardViewLocalAuthority = lazy(
  () => import('@pages/AdminDashboard/ViewLocalAuthority/ViewLocalAuthority')
);
export const AdminDashboardLocalAuthoritySignUp = lazy(
  () => import('@pages/AdminDashboard/LocalAuthoritySignUp/LocalAuthoritySignUp')
);
export const AdminDashboardLocalAuthoritySignUpConfirmation = lazy(
  () =>
    import(
      '@pages/AdminDashboard/LocalAuthoritySignUp/LocalAuthoritySignUpConfirmation/LocalAuthoritySignUpConfirmation'
    )
);
export const AdminDashboardRequests = lazy(() => import('@pages/AdminDashboard/Requests/Requests'));
export const AdminDashboardManageSchools = lazy(
  () => import('@pages/AdminDashboard/ManageSchools/ManageSchools')
);
export const AdminDashboardManageCharities = lazy(
  () => import('@pages/AdminDashboard/ManageCharities/ManageCharities')
);
export const DeleteConfirmation = lazy(
  () =>
    import('@/pages/AdminDashboard/Requests/ApprovalRequest/DeleteConfirmation/DeleteConfirmation')
);

// Local Authority Dashboard
export const LocalAuthorityDashboard = lazy(
  () => import('@pages/LocalAuthorityDashboard/LocalAuthorityDashboard')
);
export const LocalAuthorityDashboardSchools = lazy(
  () => import('@pages/LocalAuthorityDashboard/ManageSchools/ManageSchools')
);
export const LocalAuthorityDashboardCharities = lazy(
  () => import('@pages/LocalAuthorityDashboard/ManageCharities/ManageCharities')
);

// Admin School
export const SchoolAdminDashboard = lazy(() => import('@pages/School/Admin/SchoolAdminDashboard'));
export const SchoolEdit = lazy(() => import('@/pages/School/Admin/SchoolEdit'));

// Admin Charity
export const CharityAdminDashboard = lazy(
  () => import('@pages/Charity/Admin/CharityAdminDashboard')
);

// Local Area
export const FindYourCommunity = lazy(() => import('@/pages/FindYourCommunity/FindYourCommunity'));
export const YourLocalArea = lazy(() => import('@/pages/YourLocalArea/YourLocalArea'));
export const Donate = lazy(() => import('@/pages/YourLocalArea/Donate/Donate'));
export const FindSchools = lazy(() => import('@/pages/YourLocalArea/FindSchool/FindSchool'));
export const FindCharities = lazy(() => import('@/pages/YourLocalArea/FindCharity/FindCharity'));
