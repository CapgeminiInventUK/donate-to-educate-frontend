import { FC, useRef } from 'react';
import styles from './Home.module.scss';
import Image from '@components/Image/Image';
import westSussexCouncilLogo from '@assets/logo/WestSussexCouncilLogo.webp';
import { HeroBanner } from '@/components/HeroBanner/HeroBanner';
import Header from '@/components/Header/Header';
import Tile from './Tile/HomeTile';
import People from '@/assets/home/tiles/People';
import Hat from '@/assets/home/tiles/Hat';
import Heart from '@/assets/home/tiles/Heart';
import PupilsTalking from '@assets/tiles/PupilsTalking.webp';
import { Link, useNavigate } from 'react-router-dom';
import donateToUs from '@assets/home/helpPupils/donateToUs.webp';
import Paths from '@/config/paths';

const Home: FC = () => {
  const navigate = useNavigate();
  const targetRef = useRef<HTMLDivElement>(null);

  const handleScrollDown = (): void => {
    if (targetRef.current) {
      window.scrollTo({
        top: targetRef.current.getBoundingClientRect().top + window.scrollY - 60,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={styles.container}>
      <HeroBanner onGetInvolvedClick={handleScrollDown} />

      <div className={styles.tileContainer} ref={targetRef}>
        <Tile
          title="A place for families"
          onClick={() => navigate(Paths.FIND_YOUR_COMMUNITY)}
          body={[
            "Find new and pre-loved school essentials at your child's school or in nearby charities.",
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

      <div className={styles.howItWorks}>
        <Image alt="Helping pupils in your local authority" image={PupilsTalking} />
        <div className={styles.textContainer}>
          <Header text="Helping pupils in your local authority" />
          <p>
            In the UK, children experiencing education poverty are missing school because they
            don&apos;t have essential supplies.
          </p>
          <p>Our vision is to make sure that every child has what they need to thrive in school.</p>
          <p>
            If you work for a local authority, find out how you can bring Donate to Educate&apos;s
            vision to life in your community and{' '}
            <Link className={styles.blueLink} to={Paths.LOCAL_AUTHORITY_JOIN_INFO}>
              register your local authority.
            </Link>
          </p>
        </div>
      </div>

      <div className={styles.helpingPupils}>
        <div className={styles.content}>
          <div>
            <Header text="Support our mission" />
            <p>
              If you&apos;re a business that wants to support schools and charities in your
              community, please{' '}
              <Link to={Paths.CONTACT} className={styles.whiteLink}>
                contact our team.
              </Link>
            </p>
            <p>
              Maybe you can donate tech or office supplies, or you can support schools and charities
              to distribute products. Whatever you can help us with, we want to hear from you.
            </p>
          </div>
        </div>
        <div className={styles.supporters}>
          <Image alt="Supporters" image={donateToUs} className={styles.donateToUs} />
        </div>
      </div>
    </div>
  );
};

export default Home;
