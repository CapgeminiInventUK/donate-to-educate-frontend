import { ReactElement, FC } from 'react';
import styles from './Sidebar.module.scss';

const Sidebar: FC = (): ReactElement => {
  return <nav className={styles.container}>Sidebar</nav>;
};

export default Sidebar;
