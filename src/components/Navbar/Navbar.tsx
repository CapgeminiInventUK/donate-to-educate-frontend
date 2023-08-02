import { ReactElement, FC } from 'react';
import styles from './Navbar.module.scss';

const Navbar: FC = (): ReactElement => {
  return <nav className={styles.container}>Navbar</nav>;
};

export default Navbar;
