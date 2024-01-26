import { FC } from 'react';
import { Route, NavLinksProps } from '@/types/props';
import NavLink from './NavLink';
import Paths from '@/config/paths';
import routes from '@/config/routes';
import styles from './NavLinks.module.scss';

interface NavRoute {
  path: Paths;
  childNavRoutes?: NavRoute[];
}

const navRoutes: NavRoute[] = [
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

const NavLinks: FC<NavLinksProps> = ({ className, theme, onLinkClicked }) => {
  const getRouteFromNavRoute = (navRoute: NavRoute): Route => {
    const selectedRoutes = routes.filter((route) => {
      if (navRoute.path === route.path) {
        return route;
      }
    });

    return selectedRoutes[0];
  };

  const getRoutes = (): Route[] => {
    const matchedRoute = navRoutes
      .map((navRoute) => {
        const selectedRoute = getRouteFromNavRoute(navRoute);

        return selectedRoute;
      })
      .filter((route) => route !== undefined);

    return matchedRoute;
  };

  const getChildRoutes = (path: Paths): Route[] => {
    const [filteredRoute] = navRoutes.filter((navRoute) => {
      return navRoute.path === path;
    });

    if (filteredRoute?.childNavRoutes) {
      const childRoutes = filteredRoute.childNavRoutes.map((childNavRoute: NavRoute) => {
        return getRouteFromNavRoute(childNavRoute);
      });

      return childRoutes;
    }

    return [];
  };

  return (
    <div className={styles.linksContainer}>
      <div className={`${className} ${styles.links}`}>
        {getRoutes().map(({ path, name }) => (
          <NavLink
            key={path}
            name={name!}
            path={path}
            theme={theme}
            childRoutes={getChildRoutes(path)}
            onLinkClicked={onLinkClicked}
          />
        ))}
      </div>
    </div>
  );
};

export default NavLinks;
