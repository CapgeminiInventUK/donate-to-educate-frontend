import { FC, useState } from 'react';
import styles from './MvpBanner.module.scss';
import { Link } from 'react-router-dom';
import Paths from '@/config/paths';
import CloseButton from '../CloseButton/CloseButton';

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
