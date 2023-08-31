import DonateToEducateBanner from '@/components/DonateToEducateBanner/DonateToEducateBanner';
import styles from './Contact.module.scss';

const Contact = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <DonateToEducateBanner />
    </div>
  );
};

export default Contact;
