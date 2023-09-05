import { FC } from 'react';
import styles from './AboutUs.module.scss';
import { Link } from 'react-router-dom';
import Paths from '@/config/paths';
import LogoCommunityInspired from '@/assets/logo/LogoCommunityInspired';
import LogoCapgeminiInvent from '@/assets/logo/LogoCapgeminiInvent';
import Image from '@/components/Image/Image';
import magazines from '@/assets/about/magazines.webp';
import facebook from '@/assets/about/facebook.webp';
import green from '@/assets/about/green-up-your-school.webp';

const AboutUs: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>About us</h1>
        <div className={styles.card}>
          <div className={styles.imageContainer}>
            <LogoCommunityInspired className={styles.communityInspiredLogo} />
            <h2>Community Inspired</h2>
            <p>
              Donate to Educate was created by Community Inspired, a not-for-profit social
              enterprise delivering projects to enhance schools, local communities and society.
            </p>
            <p>
              We focus on helping PTAs, families, and schools, reinvesting our profits to benefit
              the communities we serve.
            </p>
            <p>
              With 15 years of experience in engaging schools and PTAs, we have established
              ourselves as leading experts in school fundraising, becoming the leading supporters of
              PTAs in the UK.
            </p>
            <p>
              Thanks to our magazines and online resources, we help PTAs to raise over £150m a year,
              supporting children&apos;s education.
            </p>
            <p>
              Our mix of publishing, digital and fundraising expertise, coupled with our loyal PTA
              network, puts Community Inspired in a unique position to create one place online that
              connect schools, families, and businesses to empower children with the things they
              need to thrive at school.
            </p>
          </div>
          <Image image={magazines} alt="Magazines" className={styles.image} />
        </div>

        <div className={`${styles.card} ${styles.col}`}>
          <div className={styles.content}>
            <div className={styles.imageContainer}>
              <h2>Social media and online</h2>
              <p>
                Our communities on social media connect schools locally and nationally. We run over
                60 county and national Facebook groups with more than 30,000 active users, making us
                the largest schools&apos; network of our kind on Facebook.
              </p>
              <p>
                Our team of feature writers and editors are ready to engage with journalists and
                sector experts to create content and magazine supplements.
              </p>
              <p>
                We support schools through our popular{' '}
                <Link to={Paths.PTA} target="_blank" rel="noopener noreferrer">
                  PTA+
                </Link>{' '}
                and{' '}
                <Link to={Paths.FUNDED} target="_blank" rel="noopener noreferrer">
                  FundEd
                </Link>{' '}
                websites, giving them free resources, &apos;how to&apos; guides and advice.{' '}
              </p>
              <p>
                The PTA+ site features 60 local pages and is the No.1 free resource to over 15,000
                PTAs in the UK.
              </p>
            </div>
            <Image image={facebook} alt="Facebook" className={styles.image} />
          </div>
          <Image image={green} alt="Green up your school" className={styles.newsletter} />
        </div>
        <div className={styles.inventBanner}>
          <p>Powered by</p>
          <LogoCapgeminiInvent
            className={styles.inventLogo}
            onClick={(): Window | null =>
              window.open(Paths.INVENT, '_blank', 'rel=noopener noreferrer')
            }
          />
        </div>
        <Link className={styles.home} to={Paths.HOME}>
          Return to homepage
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;
