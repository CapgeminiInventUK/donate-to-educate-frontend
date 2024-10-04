import { FC, useState } from 'react';
import styles from './MvpBanner.module.scss';
import CloseButton from '../CloseButton/CloseButton';

const MvpBanner: FC = () => {
  const [hideBanner, setHideBanner] = useState(false);
  return !hideBanner ? (
    <div className={styles.banner}>
      <div></div>
      <div className={styles.content}>
        This is a new service - your{' '}
        <a href="https://forms.office.com/e/qLfZjhJ57K" target="_blank" rel="noreferrer">
          feedback
        </a>{' '}
        will help us to improve.
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
