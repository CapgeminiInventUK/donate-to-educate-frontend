import type { SummaryProps } from '@/types/props';
import type { FC } from 'react';
import styles from './Summary.module.scss';

const Summary: FC<SummaryProps> = ({ icon, header, subHeading, infoText, body, logo }) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>{icon}</div>
      <h1 className={styles.header}>{header}</h1>
      {infoText && <p className={styles.paragraph}>{infoText}</p>}
      {subHeading && <h3>{subHeading}</h3>}
      <ol className={styles.list}>
        {body.map((text, index) => (
          <li key={index} className={styles.paragraph}>
            {text}
          </li>
        ))}
      </ol>
      <div className={styles.logo}>{logo}</div>
    </div>
  );
};
export default Summary;
