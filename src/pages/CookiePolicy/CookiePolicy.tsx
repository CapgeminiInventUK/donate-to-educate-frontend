import { FC } from 'react';
import styles from './CookiePolicy.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import Paths from '@/config/paths';

const CookiePolicy: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <BackButton theme="blue" />
        <h1 className={styles.title}>How we use cookies</h1>
        <div className={styles.card}>
          <h2>Cookie Policy</h2>
          <p>
            Cookie Policy Our site uses cookies which are small text files that are placed on your
            computer to help us provide the best service to you.
          </p>
          <p>
            If you use this site without adjusting your cookie settings then we will assume that you
            are okay to continue. If you choose not to receive cookies, you may still use many of
            the features on our website.
          </p>
          <p>
            Most web browsers automatically accept cookies, but usually you can alter the settings
            of your browser to prevent automatic acceptance. Your browsers should provide this
            information and there are a number of sites that give guidance for various browsers,
            including allaboutcookies.org.
          </p>
          <p>
            We also use analytics to acts as an anonymous identifier when you visit the website and
            does not contain information from which you can personally be identified. We use this
            information for the purpose of creating anonymous usage and interest profiles for the
            purpose of improving and developing the website and the services that we offer.
          </p>
          <p>
            Cookies may also be contained in advertisements which may be displayed on the website by
            advertising partners that we work with. We do not have access to any information
            contained in or generated by these cookies.
          </p>
          <h2>Further information</h2>
          <p>
            We welcome your questions and feedback about our website. Should you have any issues you
            would like to raise with us please contact us:
          </p>
          <p>
            Email: <a href={Paths.EMAIL}>info@communityinspired.co.uk</a>
          </p>
          <p>
            Phone: <a href={Paths.PHONE}>01342 718679</a>
          </p>
          <p>
            Community Inspired Ltd
            <br />
            Unit 2 Bulrushes Farm
            <br />
            Coombe Hill Road
            <br />
            East Grinstead
            <br />
            West Sussex RH19 4LZ
          </p>
          <p>Registered in England & Wales: 04573509</p>
          <p>Registered Office: 112 Broadwater Street West, Worthing, West Sussex BN14 9DJ</p>
          <p>Vat reg. No. 802501090</p>
        </div>
      </div>
    </div>
  );
};
export default CookiePolicy;
