import { ReactElement, FC } from 'react';
import styles from './Navbar.module.scss';
import routes from '../../config/routes';
import LogoBlue from '../../assets/logo/LogoBlue';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Paths from '../../config/paths';

const Navbar: FC = (): ReactElement => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // eslint-disable-next-line no-console
  console.log(pathname);

  return (
    <nav className={styles.container}>
      <LogoBlue className={styles.logoBlue} onClick={(): void => navigate(Paths.HOME)} />
      <ul className={styles.links}>
        {routes.map(({ name, path }) => {
          if (name) {
            return (
              <li
                key={name}
                className={`${styles.link} ${pathname === (path as string) ? styles.active : ''}`}
              >
                <Link to={path}>{name}</Link>
              </li>
            );
          }
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
