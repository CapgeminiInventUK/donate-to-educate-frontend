import { NavRoute } from '@/types/data';
import Paths from './paths';

export const navRoutes: NavRoute[] = [
  {
    path: Paths.FAMILIES,
  },
  {
    path: Paths.SCHOOLS,
    childNavRoutes: [
      {
        path: Paths.SCHOOLS_CREATE_EDIT_PROFILE,
      },
      {
        path: Paths.SCHOOLS_FIND_COMMUNITIES,
      },
    ],
  },
  {
    path: Paths.CHARITIES,
    childNavRoutes: [
      {
        path: Paths.CHARITIES_CREATE_EDIT_PROFILE,
      },
      {
        path: Paths.CHARITIES_FIND_COMMUNITIES,
      },
    ],
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
];
