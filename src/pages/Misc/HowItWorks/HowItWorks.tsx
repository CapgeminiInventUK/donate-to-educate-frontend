import LogoCapgeminiInvent from '@/assets/logo/LogoCapgeminiInvent';
import BackButton from '@/components/BackButton/BackButton';
import Card from '@/components/Card/Card';
import Paths from '@/config/paths';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './HowItWorks.module.scss';

const HowItWorks: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <BackButton theme="blue" />
        <h1 className={styles.title}>How it works</h1>
        <Card>
          <h2>We&apos;re serious about helping children reach their potential.</h2>
          <p>
            That&apos;s why we&apos;ve created one place for communities to connect with families
            and help children get the essential things they need to learn, grow and thrive in
            school.
          </p>
          <h3>One place for families</h3>
          <p>Parents, guardians and families can use this service to:</p>
          <ul>
            <li>search charities and schools in your local area</li>
            <li>find your child&apos;s school</li>
            <li>view products at your child&apos;s school</li>
            <li>request products from your child&apos;s school</li>
            <li>find local charities who may have what you need</li>
            <li>request products from your nearby charities</li>
            <li>donate products to help the next child</li>
          </ul>
          <h3>One place for schools</h3>
          <p>Schools can use this service to:</p>
          <ul>
            <li>create a school profile</li>
            <li>list the products you have available</li>
            <li>reply to families with product requests</li>
            <li>help arrange for families to get the products</li>
            <li>list the products you need</li>
            <li>ask charities for help taking extra stock</li>
            <li>ask charities to help find stock you need</li>
          </ul>
          <h3>One place for charities and volunteers</h3>
          <p>Charities and volunteers can use this service to:</p>
          <ul>
            <li>create a charity profile</li>
            <li>list the products you have available</li>
            <li>reply to families with product requests</li>
            <li>help schools who need you to take their extra stock</li>
            <li>share extra stock with schools and the community</li>
            <li>donate products</li>
          </ul>
          <h3>What if I just want to donate?</h3>
          <p>
            You can{' '}
            <Link to={Paths.FIND_YOUR_COMMUNITY}>
              donate products to your local charities or schools
            </Link>{' '}
            if they have joined Donate to Educate. You may also wish to{' '}
            <Link to={Paths.CONTACT}>contact us to support us another way.</Link>
          </p>
        </Card>

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
export default HowItWorks;
