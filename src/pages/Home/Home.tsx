import { FC } from 'react';
import styles from './Home.module.scss';
import Image from '@components/Image/Image';
import westSussexCouncilLogo from '@assets/logo/WestSussexCouncilLogo.webp';
import Header from '@components/Header/Header';
import InfoTile from '@/components/InfoTile/InfoTile';
import LetsHelpChildren from './LetsHelpChildren/LetsHelpChildren';
import { HeroBanner } from '@/components/HeroBanner/HeroBanner';
import Carousel from '@/components/Carousel/Carousel';
import Items from '@/assets/carousel/items.webp';
import Request from '@/assets/carousel/request.webp';
import Stock from '@/assets/carousel/stock.webp';

const Home: FC = () => {
  return (
    <div className={styles.container}>
      <HeroBanner />
      <Carousel
        items={[
          {
            title:
              'A platform to unite communities to collect items and match need to availability',
            image: Stock,
            colour: 'lightBlue',
          },
          {
            title:
              'Families can get new and pre-loved products from your school and local communities',
            image: Request,
            colour: 'midBlue',
          },
          {
            title:
              'Schools can connect to communities to say what stock you have, what your pupils need and what extra stock you can share',
            image: Items,
            colour: 'darkBlue',
          },
        ]}
      />
      <InfoTile colour="lightBlue" />
      <InfoTile colour="midBlue" />
      <InfoTile colour="darkBlue" />
      <LetsHelpChildren />
      <div className={styles.councilBanner}>
        <Header
          className={styles.title}
          text="First launching in partnership with West Sussex County Council"
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
