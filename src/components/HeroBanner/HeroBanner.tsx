import { FC } from 'react';
import styles from './HeroBanner.module.scss';
import Image from '../../components/Image/Image';
import HeroBannerPicture from '../../assets/hero-pictures/HeroBanner.webp';

export const HeroBanner: FC = () => {
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.textContainer}>
        <h2>Donate to Educate</h2>
        <div>
          Connecting communities, charities and schools to tackle education poverty and give pupils
          the things they need to thrive at school.
        </div>
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
