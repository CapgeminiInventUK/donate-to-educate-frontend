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
const InitialStatement = lazy(() => import('@pages/School/InitialStatement/InitialStatement'));
const Login = lazy(() => import('@pages/Login/Login'));
const AdminDashboard = lazy(() => import('@pages/AdminDashboard/AdminDashboard'));

const NotFound = lazy(() => import('@pages/NotFound/NotFound'));

export {
  Home,
  AboutUs,
  Contact,
  NotFound,
  AccessabilityStatement,
  PrivacyPolicy,
  TermsAndConditions,
  InitialStatement,
  Login,
  AdminDashboard,
  Form,
};
