import { FC } from 'react';
import styles from './Home.module.scss';
import Image from '@components/Image/Image';
import westSussexCouncilLogo from '@assets/logo/WestSussexCouncilLogo.webp';
import Header from '@components/Header/Header';
import InfoTile from '@/components/InfoTile/InfoTile';
import SustainabilityAndCircularity from './SustainabilityAndCircularity/SustainabilityAndCircularity';
import { HeroBanner } from '@/components/HeroBanner/HeroBanner';
import Carousel from '@/components/Carousel/Carousel';
import Laptop from '@/assets/carousel/Laptop.webp';
import Tablet from '@/assets/carousel/Tablet.webp';
import Tiles from '@/assets/carousel/Tiles.webp';
import Button from '@/components/Button/Button';
import { useNavigate } from 'react-router-dom';

const Home: FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.actionButtons}>
        <Button
          className={styles.buttons}
          theme="darkBlue"
          text="Login"
          onClick={() => navigate('login')}
        />
        <Button
          className={styles.buttons}
          theme="darkBlue"
          text="Admin dashboard"
          onClick={() => navigate('admin-dashboard')}
        />
        <Button
          className={styles.buttons}
          theme="midBlue"
          text="School sign up"
          onClick={() => navigate('form')}
        />
        <Button
          className={styles.buttons}
          theme="midBlue"
          text="Charity sign up"
          onClick={() => navigate('form')}
        />
      </div>
      <HeroBanner />
      <Carousel
        items={[
          {
            title:
              'A platform to unite communities to collect items and match need to availability',
            image: Laptop,
            colour: 'lightBlue',
          },
          {
            title:
              'Parents and guardians can request available items from their school or local community groups.',
            image: Tablet,
            colour: 'midBlue',
          },
          {
            title:
              'Schools can connect to local community groups to list the items they need, items available and excess stock they can share',
            image: Tiles,
            colour: 'darkBlue',
          },
        ]}
      />
      <InfoTile colour="lightBlue" />
      <InfoTile colour="midBlue" />
      <InfoTile colour="darkBlue" />
      <SustainabilityAndCircularity />
      <div className={styles.councilBanner}>
        <Header
          className={styles.title}
          text="First launching in partnership with West Sussex County&nbsp;Council"
        />
        <Image
          image={westSussexCouncilLogo}
          alt="west sussex county council logo"
          width={300}
          className={styles.westSussexLogo}
        />
      </div>
    </div>
  );
};

export default Home;
