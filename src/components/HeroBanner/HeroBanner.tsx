import LogoPurple from '@/assets/logo/LogoPurple';
import type { HeroBannerProps } from '@/types/props';
import type { FC } from 'react';
import HeroBannerPicture from '../../assets/hero-pictures/HeroBanner.webp';
import Image from '../../components/Image/Image';
import Header from '../Header/Header';
import styles from './HeroBanner.module.scss';

export const HeroBanner: FC<HeroBannerProps> = ({ onGetInvolvedClick }) => {
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.textContainer}>
        <LogoPurple />
        <Header text="Let's stop education poverty" />
        <p>
          We&apos;re on a mission to tackle education poverty and empower children to thrive at
          school. <span onClick={onGetInvolvedClick}>See how you can get involved</span>.
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
