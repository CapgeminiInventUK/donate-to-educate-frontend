import Paths from '@/config/paths';
import { type FC, useState } from 'react';
import { Link } from 'react-router-dom';
import CloseButton from '../CloseButton/CloseButton';
import styles from './MvpBanner.module.scss';

const MvpBanner: FC = () => {
  const [hideBanner, setHideBanner] = useState(false);
  return !hideBanner ? (
    <div className={styles.banner}>
      <div></div>
      <div className={styles.content}>
        This is a new service - your <Link to={Paths.CONTACT}>feedback</Link> will help us to
        improve it.
      </div>
      <div className={styles.buttonContainer}>
        <CloseButton onClick={() => setHideBanner(true)} />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default MvpBanner;
