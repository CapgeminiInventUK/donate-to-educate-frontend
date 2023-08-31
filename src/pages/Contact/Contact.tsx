import DonateToEducateBanner from '@/components/DonateToEducateBanner/DonateToEducateBanner';
import styles from './Contact.module.scss';
import { FC } from 'react';

const Contact: FC = () => {
  return (
    <div className={styles.container}>
      <DonateToEducateBanner />
    </div>
  );
};

export default Contact;
