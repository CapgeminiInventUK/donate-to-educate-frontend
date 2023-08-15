import { ReactElement, FC } from 'react';
import styles from './Navbar.module.scss';
import routes from '../../config/routes';
import LogoBlue from '../../assets/logo/LogoBlue';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Paths from '../../config/paths';
import Button from '../Button/Button';

const Navbar: FC = (): ReactElement => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className={styles.container}>
      <LogoBlue className={styles.logoBlue} onClick={(): void => navigate(Paths.HOME)} />
      <ul className={styles.links}>
        {routes.map(({ name, path }) => {
          if (!name) {
            return;
          }

          if (path === Paths.DONATE) {
            return (
              <Button
                key={name}
                text={`${name} (coming soon)`}
                theme="darkBlue"
                onClick={(): void => navigate(Paths.DONATE)}
                className={styles.navButton}
                disabled
              ></Button>
            );
          }

          return (
            <li
              key={name}
              className={`${styles.link} ${pathname === (path as string) ? styles.active : ''}`}
            >
              <Link to={path}>{name}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
