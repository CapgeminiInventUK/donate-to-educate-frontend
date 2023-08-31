import { FC } from 'react';
import DonateToEducateBanner from '@/components/DonateToEducateBanner/DonateToEducateBanner';
import styles from './AccessibilityStatement.module.scss';
import { Link } from 'react-router-dom';
import Paths from '@/config/paths';

const AccessibilityStatement: FC = () => {
  return (
    <div className={styles.container}>
      <DonateToEducateBanner />
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>Accessibility statement</h1>
        <div className={styles.card}>
          <h3>Accessibility statement for Donate to Educate</h3>
          <p>
            We want as many people as possible to be able to use this website. We have taken steps
            to make this website as accessible as possible, for instance:
          </p>
          <ul>
            <li>content is written in plain English</li>
            <li>visually hidden content is included on images and buttons</li>
            <li>
              text against a coloured background passes a minimum of Web Content Accessibility
              Guidelines (WCAG) 2.1 AA colour contrast criteria
            </li>
          </ul>
          <p>AbilityNet has advice on making your device easier to use if you have a disability</p>
          <h3>Accessibility testing</h3>
          <p>
            We are aware that the site needs to be fully accessibility tested for us to identify
            where we need to improve. We plan on accessibility testing this site as soon as
            possible. This page will be updated once accessibility testing has taken place.
          </p>
          <h3>Feedback and contact information</h3>
          <p>
            Contact us if you want to report an accessibility issue or if you need information on
            this website in a different format, like an accessible PDF or large print:
          </p>
          <ul>
            <li className={styles.email}>
              email: <Link to={Paths.EMAIL}>team@donatetoeducate.org.uk</Link>
            </li>
          </ul>
          <p>We will consider your request and reply to you as soon as possible.</p>
          <h3>Technical information about this website&apos;s accessibility</h3>
          <p>
            We are committed to making this website as accessible as possible, in accordance with
            the Equality Act 2010.
          </p>
          <p>
            If you have contacted us about this website&apos;s accessibility and you are not happy
            with how we respond, contact the{' '}
            <Link to={Paths.EQUALITY_SERVICES} target="_blank" rel="noopener noreferrer">
              Equality Advisory and Support Service (EASS)
            </Link>
            .
          </p>
          <h3>Compliance status</h3>
          <p>
            Information about this website&apos;s compliance with the WCAG 2.1 standard will be
            published on this page when accessibility testing has taken place.
          </p>
          <h3>What we are doing to improve accessibility</h3>
          <p>
            Our accessibility roadmap will be published on this page when testing has taken place.
            This will show how and when we plan to improve accessibility on this website.
          </p>
          <h3>About this accessibility statement</h3>
          <p>
            This statement was prepared on 31 August 2023. It was last reviewed on 31 August 2023.
            Information on accessibility testing will be published on this page after testing has
            been carried out.
          </p>
          <Link className={styles.home} to={Paths.HOME}>
            Return to homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityStatement;
