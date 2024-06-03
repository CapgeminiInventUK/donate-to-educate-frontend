import { FC } from 'react';
import styles from './MvpBanner.module.scss';
import { Link } from 'react-router-dom';
import Paths from '@/config/paths';

const MvpBanner: FC = () => {
  return (
    <div className={styles.banner}>
      This is a new service – your <Link to={Paths.CONTACT}>feedback</Link> will help us to improve
      it.
    </div>
  );
};

export default MvpBanner;
