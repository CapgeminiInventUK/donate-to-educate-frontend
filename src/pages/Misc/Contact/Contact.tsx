import styles from './Contact.module.scss';
import { FC } from 'react';
import Paths from '@/config/paths';
import { Link } from 'react-router-dom';
import Email from '@/assets/contact/Email';
import Phone from '@/assets/contact/Phone';
import BackButton from '@/components/BackButton/BackButton';
import Card from '@/components/Card/Card';

const Contact: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <BackButton theme="blue" />
        <h1 className={styles.title}>Contact us</h1>
        <Card className={styles.contactCard}>
          <Email />
          <Link to={Paths.EMAIL} className={styles.email}>
            team@donatetoeducate.org.uk
          </Link>
          <Phone />
          <Link to={Paths.PHONE} className={styles.email}>
            0134 271 8679
          </Link>
          <Link className={styles.home} to={Paths.HOME}>
            Return to homepage
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
