import { FC } from 'react';
import DonateToEducateBanner from '@/components/DonateToEducateBanner/DonateToEducateBanner';
import styles from './AccessibilityStatement.module.scss';

const AccessibilityStatement: FC = () => {
  return (
    <div className={styles.container}>
      <DonateToEducateBanner />
    </div>
  );
};

export default AccessibilityStatement;
