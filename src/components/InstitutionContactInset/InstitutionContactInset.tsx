import { FC } from 'react';
import styles from './InstitutionContactInset.module.scss';
import { InstitutionContactInsetProps } from '@/types/props';
import Phone from '@/assets/icons/Phone';
import Email from '@/assets/icons/email';

const InstitutionContactInset: FC<InstitutionContactInsetProps> = ({ header }) => {
  return (
    header && (
      <div className={styles.contactArea}>
        <div className={styles.contactAreaItem}>
          <Phone /> {header.phone}
        </div>
        <div className={styles.contactAreaItem}>
          <Email /> {header.email}
        </div>
      </div>
    )
  );
};
export default InstitutionContactInset;
