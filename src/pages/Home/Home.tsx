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
import { GraphQLQuery } from '@aws-amplify/api';
import { getSchoolByName } from '@/graphql/queries';
import { GetSchoolByNameQuery } from '@/types/api';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/graphqlClient';

const Home: FC = () => {
  const {
    data,
    // isLoading,
    // isSuccess,
    error,
  } = useQuery({
    queryKey: ['schools'],
    // enabled,
    queryFn: async () => {
      const response = await client.graphql<GraphQLQuery<GetSchoolByNameQuery>>({
        query: getSchoolByName,
        variables: { name: 'Edith Neville Primary School' },
      });

      return response.data;
    },
  });

  // eslint-disable-next-line no-console
  console.log(data, error);

  return (
    <div className={styles.container}>
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
