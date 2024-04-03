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
import FormButton from '@/components/FormButton/FormButton';
import PupilsTalking from '@assets/tiles/PupilsTalking.webp';
import { Link, useNavigate } from 'react-router-dom';
import Star from '@/assets/home/helpPupils/Star';
import Archive from '@/assets/home/helpPupils/Archive';
import donateToUs from '@assets/home/helpPupils/donateToUs.webp';
import Paths from '@/config/paths';

const Home: FC = () => {
  const navigate = useNavigate();

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
          onClick={() => navigate(Paths.FIND_YOUR_COMMUNITY)}
          body={[
            "Find new and pre-loved school essentials at your child' school or in nearby charities.",
            "Donate the things you don't need to help the next pupil and the planet.",
          ]}
          icon={<People />}
          buttonText="Get started"
        />

        <Tile
          title="A place for schools"
          onClick={() => navigate(Paths.SIGN_UP_SCHOOL)}
          body={[
            'Create a school profile to show which products you have in stock and ask for donations.',
            'Help families with product requests and get support from charities.',
          ]}
          icon={<Hat />}
          buttonText="Join"
        />

        <Tile
          title="A place for charities"
          onClick={() => navigate(Paths.SIGN_UP_CHARITY)}
          body={[
            'Create a charity profile to show which products you stock.',
            'Help children get the things they need by connecting with nearby schools, PTAs and local communities.',
          ]}
          icon={<Heart />}
          buttonText="Join"
        />
      </div>

      <div className={styles.howItWorks}>
        <Image alt="How it works" image={PupilsTalking} />
        <div className={styles.textContainer}>
          <Header text="How it works" />
          <p>Giving communities one place to collaborate and help children thrive at school.</p>
          <FormButton
            className={styles.howItWorksBtn}
            theme="formButtonMidBlue"
            onClick={() => navigate(Paths.HOW_IT_WORKS)}
            text="Find out more"
            ariaLabel="find out more"
          />
        </div>
      </div>

      <div className={styles.helpingPupils}>
        <div className={styles.content}>
          <div>
            <Header text="Helping pupils and the planet" />
            <p>
              Every year, pupils experiencing education poverty miss days off school because they
              don&apos;t have the things they need.
            </p>
            <p>
              With over 100 million items of school uniform, laptops and other essentials destined
              for landfill, it&apos;s time to create circularity within education.
            </p>
          </div>
          <div className={styles.actionButtons}>
            <Link to={Paths.FIND_YOUR_COMMUNITY} className={styles.button}>
              <Archive />
              <h3>Donate products</h3>
            </Link>
            <Link to={Paths.CONTACT} className={styles.button}>
              <Star />
              <h3>Support us</h3>
            </Link>
          </div>
        </div>
        <Image alt="Supporters" image={donateToUs} />
      </div>
    </div>
  );
};

export default Home;
