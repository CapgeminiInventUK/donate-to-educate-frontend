import { ReactElement, FC } from 'react';
import styles from './Footer.module.scss';
import LogoWhite from '../../assets/logo/LogoWhite';
import { Link, useNavigate } from 'react-router-dom';
import Paths from '../../config/paths';
import Button from '../Button/Button';

const Footer: FC = (): ReactElement => {
  const navigate = useNavigate();
  return (
    <footer className={styles.container}>
      <div className={styles.footerHeader}>
        <LogoWhite className={styles.logo} />
        <Button
          theme="midBlue"
          text="Contact us"
          onClick={(): void => navigate(Paths.CONTACT)}
          className={styles.fitContent769}
        />
      </div>
      <div className={styles.links}>
        <Link to={Paths.HOME} className={styles.link}>
          Accessibility statement
        </Link>
        <Link to={Paths.HOME} className={styles.link}>
          Privacy Policy
        </Link>
        <Link to={Paths.HOME} className={styles.link}>
          Terms and conditions
        </Link>
      </div>
      <p>Educate to Donate &copy;</p>
    </footer>
  );
};

export default Footer;
