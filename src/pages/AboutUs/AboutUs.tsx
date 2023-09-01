import { FC } from 'react';
import styles from './AboutUs.module.scss';
import { Link } from 'react-router-dom';
import Paths from '@/config/paths';
import LogoWhite from '@/assets/logo/LogoWhite';
import LogoCommunityInspired from '@/assets/logo/LogoCommunityInspired';
import LogoCapgeminiInvent from '@/assets/logo/LogoCapgeminiInvent';

const AboutUs: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <LogoCommunityInspired className={styles.communityInspiredLogo} />
        <LogoWhite className={styles.logo} />
      </div>
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>About us</h1>
        <div className={styles.card}>
          <h2>Community Inspired</h2>
          <p>
            Donate to Educate was created by Community Inspired, a not-for-profit social enterprise
            delivering projects to enhance schools, local communities and society.
          </p>
          <p>
            We focus on helping PTAs, families, and schools, reinvesting reinvest our profits to
            benefit the communities we serve.
          </p>
          <p>
            With 15 years of experience engaging parents, teachers and PTAs, we have established
            ourselves as experts in school fundraising, becoming the leading fundraisers of PTAs in
            the UK.
          </p>
          <p>
            Thanks to our printed and digital magazines,{' '}
            <Link to={Paths.PTA} target="_blank" rel="noopener noreferrer">
              PTA+
            </Link>{' '}
            and{' '}
            <Link to={Paths.FUNDED} target="_blank" rel="noopener noreferrer">
              FundEd
            </Link>
            , every year, PTAs raise over £150m to support children&apos;s education.
          </p>
          <p>
            Our mix of publishing, digital and fundraising expertise, coupled with our loyal PTA
            network, puts Community Inspired in a unique position to create one place online that
            connect schools, families, and businesses to empower children with the things they need
            to thrive at school.
          </p>
        </div>

        <div className={styles.card}>
          <h2>Social media and online</h2>
          <p>
            Our communities on social media connect schools locally and nationally. We run over 60
            county and national Facebook groups with more than 30,000 active users, making us the
            largest schools&apos; network of our kind on Facebook.
          </p>
          <p>
            Our team of feature writers and editors are ready to engage with journalists and sector
            experts to create content and magazine supplements.
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
            The PTA+ site features 60 local pages and is the No.1 free resource to over 15,000 PTAs
            in the UK.
          </p>
        </div>
        <div className={styles.inventBanner}>
          <p>Powered by</p>
          <LogoCapgeminiInvent className={styles.inventLogo} />
        </div>
        <Link className={styles.home} to={Paths.HOME}>
          Return to homepage
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;
