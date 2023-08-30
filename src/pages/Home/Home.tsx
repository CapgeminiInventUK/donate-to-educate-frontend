import styles from './Home.module.scss';
import Image from '@components/Image/Image';
import westSussexCouncilLogo from '@assets/logo/WestSussexCouncilLogo.webp';
import Header from '@components/Header/Header';
import InfoTile from '@/components/InfoTile/InfoTile';
import LetsHelpChildren from './LetsHelpChildren/LetsHelpChildren';
import Carousel from '@/components/Carousel/Carousel';
import Items from '@/assets/carousel/items.webp';
import Request from '@/assets/carousel/request.webp';
import Stock from '@/assets/carousel/stock.webp';

const Home = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <Carousel
        items={[
          {
            title: 'Support West Sussex schools with their inventory needs',
            image: Stock,
            colour: 'lightBlue',
          },
          {
            title: 'Request pre-loved items directly from your school or local communities',
            image: Request,
            colour: 'midBlue',
          },
          {
            title:
              'Update the status of your inventory to increase parent and community awareness of what you have and what is needed',
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
