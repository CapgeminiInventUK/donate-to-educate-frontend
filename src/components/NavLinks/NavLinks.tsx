import { FC } from 'react';
import { Route, NavLinksProps } from '@/types/props';
import NavLink from './NavLink';
import Paths from '@/config/paths';
import routes from '@/config/routes';
import styles from './NavLinks.module.scss';
import { NavRoute } from '@/types/data';
import { navRoutes } from '@/config/navRoutes';
import { useStore } from '@/stores/useStore';
import LogoutButton from '../LogoutButton/LogoutButton';

const NavLinks: FC<NavLinksProps> = ({ className, theme, onLinkClicked }) => {
  const user = useStore((state) => state.user);

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
    const filteredRoute = navRoutes.find((navRoute) => {
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
        {user !== undefined && <LogoutButton />}
      </div>
    </div>
  );
};

export default NavLinks;
