import { lazy } from 'react';

const Home = lazy(() => import('@pages/Home/Home'));
const AboutUs = lazy(() => import('@pages/AboutUs/AboutUs'));
const Contact = lazy(() => import('@pages/Contact/Contact'));
const AccessabilityStatement = lazy(
  () => import('@pages/AccessibilityStatement/AccessibilityStatement')
);

const NotFound = lazy(() => import('@pages/NotFound/NotFound'));

export { Home, AboutUs, Contact, NotFound, AccessabilityStatement };
