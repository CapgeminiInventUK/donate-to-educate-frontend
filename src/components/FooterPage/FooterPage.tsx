import { FC } from 'react';
import styles from './FooterPage.module.scss';
import DonateToEducateBanner from '../DonateToEducateBanner/DonateToEducateBanner';
import Paths from '@/config/paths';
import { Link } from 'react-router-dom';
import { FooterPageProps } from '@/types/props';

const FooterPage: FC<FooterPageProps> = ({ title, children }) => {
  return (
    <div className={styles.container}>
      <DonateToEducateBanner />
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.card}>
          {children}
          <Link className={styles.home} to={Paths.HOME}>
            Return to homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterPage;
