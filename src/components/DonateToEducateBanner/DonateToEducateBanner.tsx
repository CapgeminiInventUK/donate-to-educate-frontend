import { ReactElement, FC } from 'react';
import styles from './DonateToEducateBanner.module.scss';
import LogoWhite from '@/assets/logo/LogoWhite';

const DonateToEducateBanner: FC = (): ReactElement => {
  return (
    <div className={styles.container}>
      <LogoWhite className={styles.logo} />
    </div>
  );
};

export default DonateToEducateBanner;
