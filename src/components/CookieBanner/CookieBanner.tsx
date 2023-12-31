import { FC, useState } from 'react';
import styles from './CookieBanner.module.scss';
import Cookie from '@/assets/cookie/Cookie';
import Button from '../Button/Button';

const cookiePreferencesSpecified = localStorage.getItem('cookieConsent') !== null;

const CookieBanner: FC = () => {
  const [bannerHidden, setBannerHidden] = useState<boolean>(cookiePreferencesSpecified);

  return (
    <>
      <div className={`${styles.cookieBanner} ${bannerHidden ? styles.hidden : ''}`}>
        <Cookie className={styles.cookie} />
        <p>
          <span>We use cookies in the delivery of our services.</span> To learn about the cookies we
          use and information about your preferences and opt-out choices, please click here. By
          using our platfrom you agree to use of cookies
        </p>
        <Button
          theme="outline-light"
          text="Decline"
          onClick={(): void => {
            localStorage.setItem('cookieConsent', 'FALSE');
            setBannerHidden(true);
          }}
        />
        <Button
          theme="light"
          text="Allow"
          onClick={(): void => {
            localStorage.setItem('cookieConsent', 'TRUE');
            setBannerHidden(true);
          }}
        />
      </div>
    </>
  );
};

export default CookieBanner;
