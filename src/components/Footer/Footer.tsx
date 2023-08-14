import { ReactElement, FC } from 'react';
import styles from './Footer.module.scss';
import LogoWhite from '../../assets/logo/LogoWhite';
import { Link, useNavigate } from 'react-router-dom';

const Footer: FC = (): ReactElement => {
  const navigate = useNavigate();
  return (
    <footer className={styles.container}>
      <LogoWhite className={styles.logo} />
      <button onClick={(): void => navigate('/contact')} className={styles.button}>
        Contact us
      </button>
      <div className={styles.links}>
        <Link to={'/'} className={styles.link}>
          Accessibility statement
        </Link>
        <Link to={'/'} className={styles.link}>
          Privacy Policy
        </Link>
        <Link to={'/'} className={styles.link}>
          Terms and conditions
        </Link>
      </div>
      <p>Educate to Donate &copy;</p>
    </footer>
  );
};

export default Footer;
