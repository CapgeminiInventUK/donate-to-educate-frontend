import { FC } from 'react';
import styles from './LocallAuthorityJoinInfo.module.scss';
import Phone from '@/assets/tiles/Phone';
import { Link } from 'react-router-dom';
import Paths from '@/config/paths';
import EmailSolid from '@/assets/tiles/EmailSolid';
import AllLocalAuthorityLogos from '@/assets/sign-up/image-all-authority-logo.webp';
import Image from '@/components/Image/Image';
import BackButton from '@/components/BackButton/BackButton';
import Card from '@/components/Card/Card';

const LocalAuthorityJoinInfo: FC = () => {
  return (
    <div className={styles.container}>
      <BackButton theme="blue" />
      <Card>
        <h2>How local authorities join Donate to Educate</h2>
        <p>
          If you work for a local authority, you can support us by managing the schools and
          charities in your area on our platform.
        </p>
        <p>To join, contact our team to discuss the next steps.</p>
        <div className={styles.linksContainer}>
          <EmailSolid />
          <Link to={Paths.EMAIL} className={styles.link}>
            team@donatetoeducate.org.uk
          </Link>
          <Phone />
          <p className={styles.link}>0134 271 8679</p>
          <Link className={styles.home} to={Paths.HOME}>
            Return to homepage
          </Link>
          <Image
            className={styles.image}
            image={AllLocalAuthorityLogos}
            alt="All Local autority logos"
          />
        </div>
      </Card>
    </div>
  );
};

export default LocalAuthorityJoinInfo;
