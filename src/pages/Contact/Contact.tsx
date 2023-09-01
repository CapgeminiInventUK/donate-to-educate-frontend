import DonateToEducateBanner from '@/components/DonateToEducateBanner/DonateToEducateBanner';
import styles from './Contact.module.scss';
import { FC } from 'react';
import Paths from '@/config/paths';
import { Link } from 'react-router-dom';
import Email from '@/assets/tiles/Email';

const Contact: FC = () => {
  return (
    <div className={styles.container}>
      <DonateToEducateBanner />
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>Contact us</h1>
        <div className={styles.card}>
          <Email />
          <Link to={Paths.EMAIL} className={styles.email}>
            team@donatetoeducate.org.uk
          </Link>
          <Link className={styles.home} to={Paths.HOME}>
            Return to homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
