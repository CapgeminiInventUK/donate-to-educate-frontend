import styles from './Home.module.scss';
import Image from '../../components/Image/Image';
import { useMediaQuery } from 'react-responsive';
import { breakpoints } from '../../utils/globals';
import westSussexCouncilLogo from '../../assets/logo/WestSussexCouncilLogo.webp';

const Home = (): JSX.Element => {
  const isMobile = useMediaQuery({ query: `(max-width: ${breakpoints.screenMedium})` });
  const councilBannerText = 'Supporting over 60 schools in West Sussex';

  return (
    <div className={styles.container}>
      <div className={styles.councilBanner}>
        {isMobile ? (
          <h2 className={styles.title}>{councilBannerText}</h2>
        ) : (
          <h1 className={styles.title}>{councilBannerText}</h1>
        )}

        <Image
          image={westSussexCouncilLogo}
          alt="west sussex county council logo"
          width={300}
          className={styles.paddingLeft}
        />
      </div>
    </div>
  );
};

export default Home;
