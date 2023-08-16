import { ReactElement, FC } from 'react';
import styles from './Navbar.module.scss';
import LogoBlue from '../../assets/logo/LogoBlue';
import { useNavigate } from 'react-router-dom';
import Paths from '../../config/paths';
import NavLinks from '../NavLinks/NavLinks';

const Navbar: FC = (): ReactElement => {
  const navigate = useNavigate();

  return (
    <nav className={styles.container}>
      <LogoBlue className={styles.logoBlue} onClick={(): void => navigate(Paths.HOME)} />
      <NavLinks
        theme="darkBlue"
        className={styles.links}
        linkClassName={styles.link}
        activeClassName={styles.active}
        buttonClassName={styles.navButton}
      />
    </nav>
  );
};

export default Navbar;
