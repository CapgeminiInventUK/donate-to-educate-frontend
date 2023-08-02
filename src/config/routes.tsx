import Paths from './paths';
import { Home, NotFound } from './lazy';

const routes = [
  {
    path: Paths.HOME,
    element: <Home />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
