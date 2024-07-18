import type { FC } from 'react';
import ClickableLogo from '../ClickableLogo/ClickableLogo';
import NavLinks from '../NavLinks/NavLinks';
import styles from './Navbar.module.scss';

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
