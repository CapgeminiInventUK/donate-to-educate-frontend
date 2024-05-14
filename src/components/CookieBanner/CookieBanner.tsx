import { FC, useState } from 'react';
import styles from './CookieBanner.module.scss';
import Cookie from '@/assets/cookie/Cookie';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import Paths from '@/config/paths';

const cookiePreferencesSpecified = localStorage.getItem('cookieConsent') !== null;

const CookieBanner: FC = () => {
  const [bannerHidden, setBannerHidden] = useState<boolean>(cookiePreferencesSpecified);

  return (
    <>
      <div className={`${styles.cookieBanner} ${bannerHidden ? styles.hidden : ''}`}>
        <Cookie className={styles.cookie} />
        <p>
          <span>We use cookies in the delivery of our services.</span> To learn about the cookies we
          use and information about your preferences and opt-out choices, please{' '}
          <Link className={styles.linkText} to={Paths.COOKIE_POLICY}>
            click here
          </Link>
          . By using our platform you agree to use of cookies
        </p>
        <div className={styles.buttons}>
          <Button
            theme="outline-light"
            text="Decline"
            onClick={(): void => {
              localStorage.setItem('cookieConsent', 'FALSE');
              setBannerHidden(true);
            }}
            ariaLabel="decline"
          />
          <Button
            theme="light"
            text="Allow"
            onClick={(): void => {
              localStorage.setItem('cookieConsent', 'TRUE');
              setBannerHidden(true);
            }}
            ariaLabel="allow"
          />
        </div>
      </div>
    </>
  );
};

export default CookieBanner;
