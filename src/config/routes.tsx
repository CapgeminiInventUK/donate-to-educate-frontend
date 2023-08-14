import Paths from './paths';
import { Home, NotFound } from './lazy';

const routes = [
  {
    path: Paths.HOME,
    element: <Home />,
    name: 'Home',
  },
  {
    path: Paths.ABOUT,
    element: <Home />,
    name: 'About us',
  },
  {
    path: Paths.CONTACT,
    element: <Home />,
    name: 'Contact',
  },
  {
    path: Paths.COMING_SOON,
    element: <Home />,
    name: 'Coming soon',
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
