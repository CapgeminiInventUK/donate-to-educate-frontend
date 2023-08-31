import { FC } from 'react';
import routes from '@/config/routes';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import Button from '../Button/Button';
import { useMediaQuery } from 'react-responsive';
import { breakpoints } from '@utils/globals';
import { NavLinksProps } from '@/types/props';
import LogoGrey from '@assets/logo/LogoGrey';
import styles from './NavLinks.module.scss';

const NavLinks: FC<NavLinksProps> = ({
  theme,
  activeClassName,
  linkClassName,
  className,
  buttonClassName,
}) => {
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
          const text = isMobile ? name : `${name} (coming soon)`;
          return (
            <Button
              key={name}
              text={
                <div className={styles.buttonContent}>
                  <LogoGrey className={styles.logoGrey} />
                  {text}
                </div>
              }
              theme={theme}
              onClick={(): void => navigate(Paths.DONATE)}
              className={`${buttonClassName} ${styles.hidden}`}
              disabled
            />
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
