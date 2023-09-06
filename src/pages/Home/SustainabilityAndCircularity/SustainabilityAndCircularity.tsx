import LogoIconBlue from '@/assets/logo/LogoIconBlue';
import styles from './SustainabilityAndCircularity.module.scss';
import { FC } from 'react';
import Image from '@/components/Image/Image';
import PupilsTalking from '../../../assets/tiles/PupilsTalking.webp';
import { useMediaQuery } from 'react-responsive';
import { breakpoints } from '@/utils/globals';
import Header from '@/components/Header/Header';

const SustainabilityAndCircularity: FC = () => {
  const isSmallScreen = useMediaQuery({ query: `(max-width: ${breakpoints.screenMedium})` });
  const isLargerThanMobile = useMediaQuery({ query: `(min-width: ${breakpoints.screenSmall})` });

  return (
    <div className={styles.container}>
      <LogoIconBlue className={styles.logo} />
      <Header text="Sustainability and Circularity" />
      <p>
        Every year, pupils experiencing education poverty miss days off school because they
        don&apos;t have the things they need. With over 100 million items of school uniform, laptops
        and other essentials destined for landfill, it is time to create circularity within
        education - supporting pupils and the planet.
      </p>
      <div className={styles.imageContainer}>
        {isLargerThanMobile && (
          <Image alt="pupils talking" image={PupilsTalking} width={isSmallScreen ? 380 : 750} />
        )}
      </div>
    </div>
  );
};

export default SustainabilityAndCircularity;
