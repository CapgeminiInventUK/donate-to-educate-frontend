import { FC } from 'react';
import styles from './DonateToEducateBanner.module.scss';
import LogoWhite from '@/assets/logo/LogoWhite';

const DonateToEducateBanner: FC = () => (
  <div className={styles.container}>
    <LogoWhite className={styles.logo} />
  </div>
);
export default DonateToEducateBanner;
