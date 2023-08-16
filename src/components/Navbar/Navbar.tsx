import { ReactElement, FC } from 'react';
import styles from './Navbar.module.scss';
import NavLinks from '../NavLinks/NavLinks';
import ClickableLogo from '../ClickableLogo/ClickableLogo';

const Navbar: FC = (): ReactElement => {
  return (
    <nav className={styles.container}>
      <ClickableLogo colour="blue" className={styles.logoBlue} />
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
