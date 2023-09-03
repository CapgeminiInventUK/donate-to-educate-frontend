import { FC } from 'react';
import FooterPage from '@/components/FooterPage/FooterPage';
import styles from './PrivacyPolicy.module.scss';
import { Link } from 'react-router-dom';
import Paths from '@/config/paths';

const PrivacyPolicy: FC = () => {
  return (
    <FooterPage title="Privacy policy">
      <p>
        This privacy policy explains how we, Community Inspired, owners of Donate to Educate,
        protect your details when you use this website.
      </p>
      <p>
        Occasionally, we may update this page if our privacy policy changes. This policy is
        effective from 1 September 2023.
      </p>

      <h3>What we collect</h3>
      <p>
        If you contact us or use our services, we may need to record information about you. General
        Data Protection Regulations (GDPR) laws mean you are entitled to know what information we
        have about you and how we use it.
      </p>
      <p>
        Essentially, we use your information to provide you with a service and we are committed to
        protecting your privacy.
      </p>
      <p>
        If you provide information that identifies you, we will only use it according to this
        privacy policy.
      </p>
      <p>We may collect the following information from you if we need it:</p>
      <ul>
        <li>name and job title</li>
        <li>contact information</li>
        <li>information to help us operate the service effectively</li>
      </ul>
      <p>
        If you give us information about another person or organisation, you must have their
        permission to provide us with it. Any information relating to children must have the
        permission of the parent or guardian.
      </p>

      <h3>How we use your data</h3>
      <p>
        We only use personal data to provide you with this service or other services you may ask us
        for. We use this data to provide you with a better service, and in particular for the
        following reasons:
      </p>
      <ul>
        <li>internal record-keeping and administration</li>
        <li>contact you by email, phone, or mail</li>
      </ul>

      <h3>Who can access your data?</h3>
      <p>
        Community Inspired will collect and process the personal data that you provide. We will not
        share your data except if you have asked us to or if we are required to by law, except in
        exceptional circumstances where personal data may be transferred on sale of Community
        Inspired Ltd to another company.
      </p>

      <h3>Contact us</h3>
      <p>
        If you need to see the information we hold about you, or if you have any questions about our
        privacy policy and how we use data, contact us:
      </p>
      <p className={styles.email}>
        Email: <Link to={Paths.EMAIL}>team@donatetoeducate.org.uk</Link>
      </p>
      <p>
        Community Inspired Ltd <br />
        Unit 2 Bulrushes Farm <br />
        Coombe Hill Road <br />
        East Grinstead <br />
        West Sussex <br />
        RH19 4LZ
      </p>
      <p>
        Registered in England & Wales: 04573509 <br />
        Registered Office: 112 Broadwater Street West, Worthing, West Sussex BN14 9DJ <br />
        Vat reg. No. 802501090
      </p>
    </FooterPage>
  );
};

export default PrivacyPolicy;
