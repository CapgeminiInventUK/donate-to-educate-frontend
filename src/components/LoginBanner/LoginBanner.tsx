import LogoWhite from '@/assets/logo/LogoWhite';
import styles from './LoginBanner.module.scss';

const LoginBanner = (): JSX.Element => (
  <div className={styles.loginBanner}>
    <LogoWhite />
  </div>
);

export default LoginBanner;
