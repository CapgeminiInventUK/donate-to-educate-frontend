import { EditProfileBannerProps } from '@/types/props';
import styles from './EditProfileBanner.module.scss';
import { FC } from 'react';

const EditProfileBanner: FC<EditProfileBannerProps> = ({ type }) => {
  return (
    <div className={`${styles.bannerContainer} ${styles[type]}`}>
      <h1>Edit your profile</h1>
      <span className={styles.subtitle}>
        Your profile can be viewed by anyone. Add, change and save details about how your {type} can
        help children and the community.
      </span>
    </div>
  );
};

export default EditProfileBanner;
