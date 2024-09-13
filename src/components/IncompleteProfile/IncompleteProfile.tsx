import Paths from '@/config/paths';
import styles from './IncompleteProfile.module.scss';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const IncompleteProfile: FC = () => {
  return (
    <div className={`${styles.bannerContainer}`}>
      <h2>We are still populating our profile</h2>

      <p>
        <span>Check back later or you can also </span>
        <Link to={Paths.LOCAL_CHARITIES}>find nearby charities who may be able to help.</Link>
      </p>

      <p>
        <Link to={Paths.CONTACT}>Contact us</Link> if you need help
      </p>
    </div>
  );
};

export default IncompleteProfile;
