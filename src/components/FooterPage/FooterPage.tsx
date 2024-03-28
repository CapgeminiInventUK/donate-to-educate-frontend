import { FC } from 'react';
import styles from './FooterPage.module.scss';
import Paths from '@/config/paths';
import { Link } from 'react-router-dom';
import { FooterPageProps } from '@/types/props';
import BackButton from '../BackButton/BackButton';

const FooterPage: FC<FooterPageProps> = ({ title, children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <BackButton theme={'blue'} />
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.card}>
          {children}
          <Link className={styles.home} to={Paths.HOME}>
            Return to homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterPage;
