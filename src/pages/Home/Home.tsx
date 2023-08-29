import styles from './Home.module.scss';
import Image from '@components/Image/Image';
import westSussexCouncilLogo from '@assets/logo/WestSussexCouncilLogo.webp';
import Header from '@components/Header/Header';
import InfoTile from '@/components/InfoTile/InfoTile';
import LetsHelpChildren from './LetsHelpChildren/LetsHelpChildren';

const Home = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <InfoTile colour="lightBlue" />
      <InfoTile colour="midBlue" />
      <InfoTile colour="darkBlue" />
      <LetsHelpChildren />
      <div className={styles.councilBanner}>
        <Header
          className={styles.title}
          text="Pilot launching in partnership with West Sussex County Council"
        />
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
