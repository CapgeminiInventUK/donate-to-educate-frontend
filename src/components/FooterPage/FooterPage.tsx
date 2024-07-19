import Card from '@/components/Card/Card';
import Paths from '@/config/paths';
import type { FooterPageProps } from '@/types/props';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './FooterPage.module.scss';

const FooterPage: FC<FooterPageProps> = ({ title, homepageLink = true, children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>{title}</h1>
        <Card className={styles.footerCard}>
          {children}
          {homepageLink && (
            <Link className={styles.home} to={Paths.HOME}>
              Return to homepage
            </Link>
          )}
        </Card>
      </div>
    </div>
  );
};

export default FooterPage;
