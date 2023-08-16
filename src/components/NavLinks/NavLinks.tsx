import { ReactElement, FC } from 'react';
import routes from '../../config/routes';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Paths from '../../config/paths';
import Button from '../Button/Button';
import { useMediaQuery } from 'react-responsive';
import { breakpoints } from '../../utils/globals';
import { NavLinksProps } from '../../types/props';

const NavLinks: FC<NavLinksProps> = ({
  theme,
  activeClassName,
  linkClassName,
  className,
  buttonClassName,
}): ReactElement => {
  const isMobile = useMediaQuery({ query: `(max-width: ${breakpoints.screenMedium})` });
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <ul className={className}>
      {routes.map(({ name, path }) => {
        if (!name) {
          return;
        }

        if (path === Paths.DONATE) {
          return (
            <Button
              key={name}
              text={isMobile ? name : `${name} (coming soon)`}
              theme={theme}
              onClick={(): void => navigate(Paths.DONATE)}
              className={buttonClassName}
              disabled
            ></Button>
          );
        }

        return (
          <li
            key={name}
            className={`${linkClassName} ${pathname === (path as string) ? activeClassName : ''}`}
          >
            <Link to={path}>{name}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavLinks;
