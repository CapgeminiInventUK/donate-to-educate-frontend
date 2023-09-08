import Paths from './paths';
import {
  Home,
  AboutUs,
  Contact,
  NotFound,
  AccessabilityStatement,
  PrivacyPolicy,
  TermsAndConditions,
} from './lazy';
import DevPreview from '@/pages/DevPreview/DevPreview';

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
    path: Paths.DEV_PREVIEW,
    element: <DevPreview />,
  },
  {
    path: Paths.DONATE,
    element: <Home />,
    name: 'Donate',
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
