import { FC } from 'react';
import styles from './FooterPage.module.scss';
import { FooterPageProps } from '@/types/props';
import Card from '@/components/Card/Card';

const FooterPage: FC<FooterPageProps> = ({ title, children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>{title}</h1>
        <Card className={styles.footerCard}>{children}</Card>
      </div>
    </div>
  );
};

export default FooterPage;
