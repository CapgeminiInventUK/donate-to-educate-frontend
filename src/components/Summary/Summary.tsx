import { FC } from 'react';
import { SummaryProps } from '@/types/props';
import styles from './Summary.module.scss';

const Summary: FC<SummaryProps> = ({ icon, header, body, logo }) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>{icon}</div>
      <h2 className={styles.header}>{header}</h2>
      {body.map((text, index) => (
        <p key={index} className={styles.paragraph}>
          {text}
        </p>
      ))}
      <div className={styles.logo}>{logo}</div>
    </div>
  );
};
export default Summary;
