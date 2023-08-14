import { ReactElement, FC } from 'react';
import styles from './Footer.module.scss';
import LogoWhite from '../../assets/logo/LogoWhite';

const Footer: FC = (): ReactElement => {
  return (
    <footer className={styles.container}>
      <LogoWhite className={styles.logo} />
    </footer>
  );
};

export default Footer;
