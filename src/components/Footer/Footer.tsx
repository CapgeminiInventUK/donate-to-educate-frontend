import { ReactElement, FC } from 'react';
import styles from './Footer.module.scss';
import LogoWhite from '@assets/logo/LogoWhite';
import { Link, useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import Image from '../../components/Image/Image';
import Button from '../Button/Button';
import WeHaveThePowerLogo from '../../assets/logo/WeHaveThePowerLogo.webp';

const Footer: FC = (): ReactElement => {
  const navigate = useNavigate();
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.container}>
        <div className={styles.footerHeader}>
          <LogoWhite className={styles.logo} />
          <Button
            theme="midBlue"
            text="Contact us"
            onClick={(): void => navigate(Paths.CONTACT)}
            className={styles.fitContent769}
          />
        </div>
        <div className={styles.linksContainer}>
          <Link to={Paths.HOME}>Accessibility statement</Link>
          <Link to={Paths.HOME}>Privacy Policy</Link>
          <Link to={Paths.HOME}>Terms and conditions</Link>
        </div>
        <p>Donate to Educate &copy;</p>
      </div>
      <div className={styles.circleOuter}>
        <div className={styles.circleInner}>
          <div className={styles.weHaveThePowerContainer}>
            <Image
              className={styles.weHaveThePowerLogo}
              image={WeHaveThePowerLogo}
              alt="we have the power logo"
              width={200}
            />
            <div>
              Donate to Educate is a national project funded by <strong>We Have The POWER</strong>
            </div>
            <Link to={Paths.WE_HAVE_THE_POWER}>wehavethepower.org/</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
