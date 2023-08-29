import { ReactElement, FC } from 'react';
import styles from './HeroBanner.module.scss';
import Image from '../../components/Image/Image';
import WeHaveThePowerLogo from '../../assets/hero-pictures/HeroBanner.webp';

export const HeroBanner: FC = (): ReactElement => {
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.textContainer}>
        <h2>Donate to Educate</h2>
        <div>
          Connecting communities, charities and schools to tackle education poverty by providing
          pupils the things they need to thrive at school.
        </div>
        <div className={styles.diagonalTextContainer}>Coming January 2024</div>
      </div>
      <Image className={styles.imageStyles} image={WeHaveThePowerLogo} alt="Children" width={200} />
    </div>
  );
};
