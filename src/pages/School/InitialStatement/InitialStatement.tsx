import { FC } from 'react';
import styles from './InitialStatement.module.scss';
import BackLink from '@/assets/navigation/BackLink';
import Paths from '@/config/paths';

const InitialStatement: FC = () => {
  return (
    <div className={styles.container}>
      <BackLink route={Paths.INTIAL_STATEMENT} />
      <div className={styles.card}>
        <h1>Join Donate to Educate</h1>
        <p>To add your school, you need to:</p>
        <ul>
          <li>be a PTA member, governor, or senior teaching staff at your school</li>
          <li>provide us with your contact details</li>
          <li>review and agree to our GDPR statements and policies</li>
          <li>
            agree that we can share your information with your local authority to confirm your
            identity
          </li>
        </ul>
        <h2>What to expect</h2>
        <p>Once you give us your details, we will:</p>
        <ul>
          <li>send your details to your local authority</li>
          <li>ask your local authority to confirm your identity</li>
          <li>email you to confirm whether you can join us</li>
        </ul>
      </div>
    </div>
  );
};

export default InitialStatement;
