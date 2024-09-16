import { lazy } from 'react';

// Misc
export const Home = lazy(() => import('@pages/Home/Home'));
export const AboutUs = lazy(() => import('@/pages/Misc/AboutUs/AboutUs'));
export const Contact = lazy(() => import('@/pages/Misc/Contact/Contact'));
export const AccessabilityStatement = lazy(
  () => import('@/pages/Misc/AccessibilityStatement/AccessibilityStatement')
);
export const PrivacyPolicy = lazy(() => import('@/pages/Misc/PrivacyPolicy/PrivacyPolicy'));
export const TermsAndConditions = lazy(
  () => import('@/pages/Misc/TermsAndConditions/TermsAndConditions')
);
export const HowItWorks = lazy(() => import('@/pages/Misc/HowItWorks/HowItWorks'));
export const CookiePolicy = lazy(() => import('@/pages/Misc/CookiePolicy/CookiePolicy'));
export const LocalAuthorityJoinInfo = lazy(
  () => import('@/pages/Join/LocalAuthorityJoinInfo/LocalAuthorityJoinInfo')
);
export const NotFound = lazy(() => import('@/pages/Misc/NotFound/NotFound'));

// Public School
export const SignUpSchool = lazy(() => import('@/pages/Join/SignUpSchool/SignUpSchool'));
export const SchoolsDashboard = lazy(() => import('@/pages/School/Public/SchoolsDashboard'));
export const SchoolDashboardItems = lazy(() => import('@/pages/School/Public/SchoolEdit'));
export const SchoolContactConfirmation = lazy(
  () => import('@/pages/School/Public/SchoolContactConfirmation')
);
export const RequestSchoolProducts = lazy(
  () => import('@/pages/School/Public/RequestSchoolProducts')
);

// Public Charity
export const SignUpCharity = lazy(() => import('@/pages/Join/SignUpCharity/SignUpCharity'));
export const CharityDashboard = lazy(() => import('@/pages/Charity/Public/CharityDashboard'));
export const CharityDashboardItems = lazy(() => import('@/pages/Charity/Public/CharityEdit'));
export const RequestCharityProducts = lazy(
  () => import('@/pages/Charity/Public/RequestCharityProducts')
);
export const CharityContactConfirmation = lazy(
  () => import('@/pages/Charity/Public/CharityContactConfirmation')
);

// Login
export const Login = lazy(() => import('@pages/Login/Login'));
export const SignIn = lazy(() => import('@pages/Login/SignIn/SignIn'));
export const ResetPassword = lazy(() => import('@/pages/Login/ResetPassword/ResetPassword'));
export const AddUser = lazy(() => import('@/pages/Login/AddUser/AddUser'));
export const Join = lazy(() => import('@/pages/Join/Join'));

// Admin Dashboard
export const AdminDashboard = lazy(() => import('@pages/AdminDashboard/AdminDashboard'));
export const AdminDashboardManageLocalAuthorities = lazy(
  () => import('@pages/AdminDashboard/ManageLocalAuthorities/ManageLocalAuthorities')
);
export const AdminDashboardLocalAuthorityUsers = lazy(
  () => import('@pages/AdminDashboard/ManageLocalAuthorities/LocalAuthorityUsers')
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

export const AdminDashboardManageSchool = lazy(
  () => import('@pages/AdminDashboard/ManageSchools/SchoolUsers')
);
export const AdminDashboardManageCharities = lazy(
  () => import('@pages/AdminDashboard/ManageCharities/ManageCharities')
);

export const AdminDashboardManageCharity = lazy(
  () => import('@pages/AdminDashboard/ManageCharities/CharityUsers')
);
export const DeleteConfirmation = lazy(
  () => import('@/components/ApprovalRequest/DeleteConfirmation/DeleteConfirmation')
);
export const Settings = lazy(() => import('@/pages/Settings/Settings'));

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
export const LocalAuthorityDashboardManageSchoolUsers = lazy(
  () => import('@pages/LocalAuthorityDashboard/ManageSchools/ManageSchoolUsers')
);
export const LocalAuthorityDashboardManageCharityUsers = lazy(
  () => import('@pages/LocalAuthorityDashboard/ManageCharities/ManageCharityUsers')
);

// Admin School
export const SchoolAdminDashboard = lazy(() => import('@pages/School/Admin/SchoolAdminDashboard'));
export const SchoolEdit = lazy(() => import('@/pages/School/Admin/SchoolEdit'));
export const SchoolAdminView = lazy(() => import('@/pages/School/Admin/SchoolAdminView'));

// Admin Charity
export const CharityAdminDashboard = lazy(
  () => import('@pages/Charity/Admin/CharityAdminDashboard')
);
export const CharityEdit = lazy(() => import('@/pages/Charity/Admin/CharityEdit'));
export const CharityAdminView = lazy(() => import('@/pages/Charity/Admin/CharityAdminView'));

// Local Area
export const FindYourCommunity = lazy(() => import('@/pages/FindYourCommunity/FindYourCommunity'));
export const YourLocalArea = lazy(
  () => import('@/pages/FindYourCommunity/YourLocalArea/YourLocalArea')
);
export const Donate = lazy(
  () => import('@/pages/FindYourCommunity/YourLocalArea/DonateAndExcess/Donate/Donate')
);
export const Excess = lazy(
  () => import('@/pages/FindYourCommunity/YourLocalArea/DonateAndExcess/Excess/Excess')
);
export const FindSchools = lazy(
  () => import('@/pages/FindYourCommunity/YourLocalArea/FindSchool/FindSchool')
);
export const FindCharities = lazy(
  () => import('@/pages/FindYourCommunity/YourLocalArea/FindCharity/FindCharity')
);

// Add Users
export const AddSchoolUser = lazy(() => import('@/pages/AddUser/AddSchoolUser/AddSchoolUser.tsx'));
