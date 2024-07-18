import { navRoutes } from '@/config/navRoutes';
import type Paths from '@/config/paths';
import routes from '@/config/routes';
import { useStore } from '@/stores/useStore';
import type { NavRoute } from '@/types/data';
import type { NavLinksProps, Route } from '@/types/props';
import type { FC } from 'react';
import LogoutButton from '../LogoutButton/LogoutButton';
import NavLink from './NavLink';
import styles from './NavLinks.module.scss';

const NavLinks: FC<NavLinksProps> = ({ className, onLinkClicked }) => {
  const user = useStore((state) => state.user);

  const getRouteFromNavRoute = (navRoute: NavRoute): Route => {
    return routes.find((route) => navRoute.path === route.path)!;
  };

  const getRoutes = (): Route[] => {
    return navRoutes.reduce((acc: Route[], navRoute) => {
      return getRouteFromNavRoute(navRoute)?.name === 'Sign in' && user
        ? acc
        : [...acc, getRouteFromNavRoute(navRoute)];
    }, []);
  };

  const getChildRoutes = (path: Paths): Route[] => {
    const filteredRoute = navRoutes.find((navRoute) => {
      return navRoute.path === path;
    });

    if (filteredRoute?.childNavRoutes) {
      return filteredRoute.childNavRoutes.map((childNavRoute: NavRoute) => {
        return getRouteFromNavRoute(childNavRoute);
      });
    }

    return [];
  };

  return (
    <div className={styles.linksContainer}>
      <div className={`${className} ${styles.links}`}>
        {getRoutes().map(({ path, name }) => (
          <NavLink
            key={path}
            name={name}
            path={path}
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
