import { FC } from 'react';
import styles from './HowItWorks.module.scss';
// import BackButton from '@/components/BackButton/BackButton';

const HowItWorks: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>How it works</h1>
        <div className={styles.card}>
          <h2>We’re serious about helping children reach their potential.</h2>
          <p>
            That’s why we’ve created one place for communities to connect with families and help
            children get the essential things they need to learn, grow and thrive in school.
          </p>
          <h3>One place for families</h3>
          <p>Parents, guardians and families can use this service to:</p>
          <ul>
            <li>search charities and schools in your local area</li>
            <li>find your child’s school</li>
            <li>view products at your child’s school</li>
            <li>request products from your child’s school</li>
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
            <li></li>
          </ul>
          <h3>What if I just want to donate?</h3>
          <p>
            You can donate products to your local charities or schools if they have joined Donate to
            Educate. You may also wish to contact us to support us another way.
          </p>
        </div>
      </div>
    </div>
  );
};
export default HowItWorks;
