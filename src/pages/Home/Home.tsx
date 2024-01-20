import { FC } from 'react';
import styles from './Home.module.scss';
import Image from '@components/Image/Image';
import westSussexCouncilLogo from '@assets/logo/WestSussexCouncilLogo.webp';
import { HeroBanner } from '@/components/HeroBanner/HeroBanner';
import Header from '@/components/Header/Header';
import Tile from './Tile/Tile';
import People from '@/assets/home/tiles/People';
import Hat from '@/assets/home/tiles/Hat';
import Heart from '@/assets/home/tiles/Heart';

const Home: FC = () => {
  return (
    <div className={styles.container}>
      <HeroBanner />

      <div className={styles.councilBanner}>
        <Header
          className={styles.title}
          text="First launching in partnership with West Sussex County Council"
          size="small"
        />
        <Image
          image={westSussexCouncilLogo}
          alt="west sussex county council logo"
          width={250}
          className={styles.westSussexLogo}
        />
      </div>
      <div className={styles.tileContainer}>
        <Tile
          title="A place for families"
          onClick={(): void => undefined}
          body={[
            "Find new and pre-loved school essentials at your child' school or in nearby charities.",
            "Donate the things you don't need to help the next pupil and the planet.",
          ]}
          icon={<People />}
        />

        <Tile
          title="A place for schools"
          onClick={(): void => undefined}
          body={[
            'Create a school profile to show which products you have in stock and ask for donations.',
            'Help families with product requests and get support from charities.',
          ]}
          icon={<Hat />}
        />

        <Tile
          title="A place for charities"
          onClick={(): void => undefined}
          body={[
            'Create a charity profile to show which products you stock.',
            'Help children get the things they need by connecting with nearby schools, PTAs and local communities.',
          ]}
          icon={<Heart />}
        />
      </div>
    </div>
  );
};

export default Home;
