import { FC } from 'react';
import styles from './HeroBanner.module.scss';
import Image from '../../components/Image/Image';
import HeroBannerPicture from '../../assets/hero-pictures/HeroBanner.webp';

export const HeroBanner: FC = () => {
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.textContainer}>
        <h1>Let&apos;s stop education poverty</h1>
        <p>
          We&apos;re on a mission to tackle education poverty by making sure every child has the
          essential items they need to thrive at school.
        </p>
        <p>
          We&apos;ll give communities, charities and schools a platform to work together and match
          the things pupils need to the items available - creating a brighter future for children
          and communities.
        </p>
        <div className={styles.diagonalTextContainer}>Coming January 2024</div>
      </div>
      <Image
        className={styles.imageStyles}
        image={HeroBannerPicture}
        alt="Children with a blue background"
        width={200}
      />
    </div>
  );
};
