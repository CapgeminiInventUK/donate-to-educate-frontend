import { ReactElement, FC } from 'react';
import styles from './Navbar.module.scss';
import routes from '../../config/routes';
import LogoBlue from '../../assets/logo/LogoBlue';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: FC = (): ReactElement => {
  const navigate = useNavigate();

  return (
    <nav className={styles.container}>
      <LogoBlue className={styles.logoBlue} onClick={(): void => navigate('/')} />
      <ul className={styles.links}>
        {routes.map(({ name, path }) => {
          if (name) {
            return (
              <li key={name} className={styles.link}>
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
