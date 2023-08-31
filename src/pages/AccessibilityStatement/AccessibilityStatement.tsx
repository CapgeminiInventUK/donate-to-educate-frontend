import DonateToEducateBanner from '@/components/DonateToEducateBanner/DonateToEducateBanner';
import styles from './AccessibilityStatement.module.scss';

const AccessibilityStatement = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <DonateToEducateBanner />
    </div>
  );
};

export default AccessibilityStatement;
