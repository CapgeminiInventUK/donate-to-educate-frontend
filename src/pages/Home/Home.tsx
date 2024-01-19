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
import { Pill } from '@/components/Pill/Pill';
import Paths from '@/config/paths';
import { Themes } from '@/types/props';

const Home: FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.actionButtons}>
        <h2>Admin</h2>
        <div>
          {[
            {
              text: 'Login',
              path: Paths.LOGIN,
              color: 'green',
              pillText: 'DONE',
              theme: 'darkBlue',
            },
            {
              text: 'Admin dashboard',
              path: Paths.ADMIN_DASHBOARD,
              color: 'blue',
              pillText: 'IN PROGRESS',
              theme: 'darkBlue',
            },
            {
              text: 'LA dashboard',
              path: Paths.LOCAL_AUTHORITY_DASHBOARD,
              color: 'blue',
              pillText: 'IN PROGRESS',
              theme: 'darkBlue',
            },
            {
              text: 'Add user',
              path: Paths.ADD_USER,
              color: 'blue',
              pillText: 'IN PROGRESS',
              theme: 'darkBlue',
            },
            {
              text: 'Edit school profile',
              path: Paths.SCHOOL_EDIT,
              color: 'blue',
              pillText: 'IN PROGRESS',
              theme: 'midBlue',
            },
            {
              text: 'Edit charity profile',
              path: Paths.HOME,
              color: 'red',
              pillText: 'TODO',
              theme: 'midBlue',
            },
          ].map(({ text, path, color, pillText, theme }) => {
            return (
              <Button
                key="text"
                collectData={true}
                className={styles.buttons}
                theme={theme as Themes}
                text={
                  <>
                    {text} - <Pill color={color as 'green'} text={pillText} />
                  </>
                }
                onClick={() => navigate(path)}
              />
            );
          })}
        </div>
        <h2>Public</h2>
        <div>
          {[
            {
              text: 'School sign up',
              path: Paths.SIGN_UP_SCHOOL,
              color: 'blue',
              pillText: 'IN PROGRESS',
              theme: 'midBlue',
            },
            {
              text: 'School profile',
              path: Paths.HOME,
              color: 'red',
              pillText: 'TODO',
              theme: 'midBlue',
            },
            {
              text: 'Charity sign up',
              path: Paths.SIGN_UP_CHARITY,
              color: 'blue',
              pillText: 'IN PROGRESS',
              theme: 'midBlue',
            },
            {
              text: 'Charity profile',
              path: Paths.HOME,
              color: 'red',
              pillText: 'TODO',
              theme: 'midBlue',
            },
          ].map(({ text, path, color, pillText, theme }) => {
            return (
              <Button
                key="text"
                className={styles.buttons}
                theme={theme as Themes}
                text={
                  <>
                    {text} - <Pill color={color as 'green'} text={pillText} />
                  </>
                }
                onClick={() => navigate(path)}
              />
            );
          })}
        </div>
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
