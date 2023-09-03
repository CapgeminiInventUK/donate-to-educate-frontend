import LogoIconBlue from '@/assets/logo/LogoIconBlue';
import styles from './LetsHelpChildren.module.scss';
import { FC } from 'react';
import Image from '@/components/Image/Image';
import PupilsTalking from '../../../assets/tiles/PupilsTalking.webp';
import { useMediaQuery } from 'react-responsive';
import { breakpoints } from '@/utils/globals';

const LetsHelpChildren: FC = () => {
  const isSmallScreen = useMediaQuery({ query: `(max-width: ${breakpoints.screenMedium})` });
  const isLargerThanMobile = useMediaQuery({ query: `(min-width: ${breakpoints.screenSmall})` });

  return (
    <div className={styles.container}>
      <LogoIconBlue className={styles.logo} />
      <h1>Let&apos;s stop education poverty</h1>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className={styles.imageContainer}>
        {isLargerThanMobile && (
          <Image alt="pupils talking" image={PupilsTalking} width={isSmallScreen ? 380 : 750} />
        )}
      </div>
    </div>
  );
};

const paragraphs = [
  "We're on a mission to tackle education poverty, by ensuring every child is given the essential items they need to thrive at school.",
  "We'll connect communities, charities and schools to work together to provide a focal point to match need to availability - creating a brighter future for children and communities.",
  "With over 100 million items of school uniform, along with laptops and other essential items destined for landfill every year, it's time to create circularity within education - supporting pupils and planet.",
];

export default LetsHelpChildren;
