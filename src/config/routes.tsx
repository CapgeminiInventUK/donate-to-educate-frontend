import Paths from './paths';
import { Home, AboutUs, Contact, NotFound } from './lazy';

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
