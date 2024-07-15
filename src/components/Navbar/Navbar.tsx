import { FC } from 'react';
import styles from './Navbar.module.scss';
import NavLinks from '../NavLinks/NavLinks';
import ClickableLogo from '../ClickableLogo/ClickableLogo';

const Navbar: FC = () => (
  <nav className={styles.container}>
    <ClickableLogo colour="blue" className={styles.logoBlue} />
    <NavLinks
      className={styles.links}
      linkClassName={styles.link}
      activeClassName="active"
      buttonClassName={styles.navButton}
    />
  </nav>
);

export default Navbar;
