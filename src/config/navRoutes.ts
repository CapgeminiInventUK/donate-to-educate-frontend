import type { NavRoute } from '@/types/data';
import Paths from './paths';

export const navRoutes: NavRoute[] = [
  {
    path: Paths.FIND_YOUR_COMMUNITY,
  },
  {
    path: Paths.HOME,
  },
  {
    path: Paths.ABOUT,
    childNavRoutes: [
      {
        path: Paths.ABOUT,
      },
      {
        path: Paths.HOW_IT_WORKS,
      },
    ],
  },
  {
    path: Paths.CONTACT,
  },
  {
    path: Paths.LOGIN,
  },
  {
    path: Paths.SIGN_IN,
  },
];
