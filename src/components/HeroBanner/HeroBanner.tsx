import { FC } from 'react';
import styles from './HeroBanner.module.scss';
import Image from '../../components/Image/Image';
import HeroBannerPicture from '../../assets/hero-pictures/HeroBanner.webp';
import Header from '../Header/Header';
import LogoPurple from '@/assets/logo/LogoPurple';

export const HeroBanner: FC = () => {
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.textContainer}>
        <LogoPurple />
        <Header text="Let's stop education poverty" />
        <p>
          We&apos;re on a mission to tackle education poverty and empower children to thrive at
          school.
        </p>
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
