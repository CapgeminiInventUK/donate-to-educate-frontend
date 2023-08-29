import styles from './Home.module.scss';
import Image from '@components/Image/Image';
import westSussexCouncilLogo from '@assets/logo/WestSussexCouncilLogo.webp';
import Header from '@components/Header/Header';

const Home = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.councilBanner}>
        <Header className={styles.title} text="Supporting over 50 schools in West Sussex" />
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
