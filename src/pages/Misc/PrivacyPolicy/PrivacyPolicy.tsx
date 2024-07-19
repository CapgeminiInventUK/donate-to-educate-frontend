import FooterPage from '@/components/FooterPage/FooterPage';
import Paths from '@/config/paths';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './PrivacyPolicy.module.scss';

const PrivacyPolicy: FC = () => {
  return (
    <FooterPage title="Privacy policy" homepageLink={false}>
      <h2>Overview</h2>
      <p>
        If you contact us or use our services, we may need to record information about you. General
        Data Protection Regulations (GDPR) laws mean you are entitled to know what information we
        have about you and how we use it.
      </p>
      <p>
        Essentially, we use your information to provide you with a service and we are committed to
        protecting your privacy. We will always respect any personal information we hold, and strive
        to keep it safe.
      </p>
      <p>
        This notice tells you what you can expect us to do with your personal information, why we
        collect it, and how we keep it secure. We make every effort to ensure your personal
        information is processed in a fair and transparent way, in line with the General Data
        Protection Regulation (GDPR) 2018, UK Data Protection Act (DPA) 2018, and the Privacy and
        Electronic Communications Regulations 2003 (PECR).
      </p>
      <p>
        The Community Inspired group includes PTA+, Funded and Donate to Educate. Community Inspired
        Ltd is not-for-profit social enterprise, with registered company 04573509 - Incorporated on
        25 October 2002. Registered Office: 112 Broadwater Street West, Worthing, West Sussex, BN14
        9DJ. All services operated by Community Inspired work to this privacy notice.
      </p>
      <h2>Data protection principles</h2>
      <p>
        This Policy sets out why we collect personal data about individuals and how we use it. It
        also explains the legal basis for this and the rights you have regarding the way your
        personal data is used. In complying with data protection law and principles, your data will
        be:
      </p>
      <ul>
        <li>Used lawfully, fairly and in a transparent way</li>
        <li>
          Collected only for valid purposes that we have clearly explained to you and not used in
          any way that is incompatible with those purposes
        </li>
        <li>Relevant to the purposes we have told you about and limited only to those purposes</li>
        <li>Accurate and kept up to date as far as we reasonably can</li>
        <li>Kept only as long as necessary for the purposes we have told you about</li>
        <li>Kept securely</li>
        <li>When do we collect personal information about you?</li>
      </ul>
      <p>We may collect personal information about you in the following ways:</p>
      <p>When you give it to us directly, for example if you:</p>
      <ul>
        <li>Apply for a job or to be a volunteer</li>
        <li>Sign up to receive information</li>
        <li>Support us through a donation</li>
        <li>Take part in events</li>
        <li>Submit a query, give us feedback or make a complaint</li>
        <li>Express interest in working with us to receive or provide products</li>
        <li>Enter into a contract or agreement with us</li>
        <li>Have your photograph taken, participate in filming, or supply a case study</li>
      </ul>
      <p>
        Your personal information may have been provided to us by others, with your consent. For
        example, by a colleague, or an organisation you get support from.
      </p>
      <p>
        If you enter information that relates to another person or organisation, you are responsible
        for ensuring that you have the authority and their permission to do so.
      </p>
      <h2>Publicly available information</h2>
      <p>
        We may for example gather contact details to increase our network of those that can support
        us, or that we can support. This could include from online articles, newspapers, public
        registers, websites and social media platforms. The information on social media platforms is
        only accessible based on the permission you give through those services directly.
      </p>
      <p>
        We might also gather publicly available information about those interested in supporting
        organisations like us in the future. This is so we can contact you in the most appropriate
        way and enables us to raise funds sooner and more cost-effectively. We will not keep
        potential supporters&apos; publicly available information without seeking their consent at
        the earliest practical opportunity.
      </p>
      <p>
        When you visit our websites, we automatically collect “cookies” which are small files placed
        on your computer. Cookies can be used to provide core functionality for a website (e.g.
        login details and page navigation) and are essential for visiting our websites. We also use
        cookies to support reporting or marketing purposes and use Google Analytics and Hotjar for
        these activities. You can opt-out of these “optional” cookies. A cookie in no way gives us
        access to your computer or any information about you, other than the data you have chosen to
        share with us. Read our Cookie Policy here.
      </p>

      <h2>The types of data we collect</h2>

      <p>Personal data we collect:</p>
      <ul>
        <li>name</li>
        <li>contact details (email address, phone numbers and postal addresses)</li>
        <li>Your employer or organisation</li>
        <li>Your role within your organisation</li>
        <li>records of your correspondence with us</li>
        <li>recordings of phone calls made to us</li>
        <li>your marketing preferences</li>
        <li>records of your donations and collections</li>
        <li>data from your visits to our website or opening our emails, using cookies</li>
      </ul>

      <p>
        If you contact us for any other reason we will collect your name, contact details and any
        information you provide to us as part of that interaction.
      </p>

      <h2>Sensitive personal information</h2>
      <p>
        Data protection law recognises certain categories of personal information are sensitive and
        therefore require more protection. This includes information about your race or ethnicity,
        political opinions, sex life or sexual orientation, religious beliefs and health data. There
        are further rules concerning the use of criminal data.
      </p>
      <p>
        If you provide us with any Sensitive Personal Data, we will treat that information with
        extra care and always in accordance with this privacy policy. Your personal information is
        stored on a secure database for no longer than is necessary.
      </p>
      <p>
        Most commonly, we will process special categories of data if: you have given explicit
        consent to the processing; or we must process the data to carry out our legal or contractual
        obligations; or you have already made the data public. If you choose to proactively share
        sensitive information with us, for example in a phone call, this data will be retained in
        line with our general policies.
      </p>

      <h2>How we use your information</h2>
      <p>We will use your data to deliver our work and provide the best service to you:</p>

      <ul>
        <li>
          Delivering our work with schools, local councils, charitable organisations, companies,
          funders and individuals
        </li>
        <li>To enable us to operate the service effectively for all parties</li>
        <li>
          Marketing communications to provide information about our work, activities and campaigns
        </li>
        <li>
          To reengage charitable organisations, companies and supporters that have previously worked
          with us, and may reasonably be interested in working with us again. We will always provide
          a way for you to opt-out of such communications.
        </li>
        <li>
          Administrative communications to fulfil our service and any contracts, including
          distributing orders to our charitable and school network and confirming product donations.
          This will include sharing data with third parties such as our logistics service providers
          and couriers
        </li>
        <li>Recruitment of staff and volunteers</li>
        <li>Keeping records of correspondence, enquiries, feedback or complaints</li>
        <li>
          Impact assessment and market research, engaging our partners through surveys and
          communications to grow our network, meet more of the needs of those we support, and to
          provide feedback to those that support us. This may include using services such as
          SmartSurvey, as well as the collection of photos, videos and case studies
        </li>
        <li>To meet any legal and contractual obligations we have</li>
      </ul>

      <h2>Our legal basis for processing personal information</h2>
      <p>
        Our legal basis for collecting, storing and using the personal information described in this
        notice will depend on the reason for collecting it. At all times we will respect your
        rights. We may process your personal data:
      </p>

      <ul>
        <li>Where we have a contract with you</li>
        <li>
          If you have given us consent to do so, such as for the use of photos or case studies
        </li>
        <li>
          When it is in our legitimate interests, and it&apos;s not overridden by your rights. This
          includes:
        </li>
        <li>Recruiting for staff and volunteers</li>
        <li>
          To process your contact details where the organisation you work for is interested in
          working with us and the services we provide
        </li>
        <li>
          For charitable organisations in our network, or lapsed within a reasonable period, to send
          you administrative communications (e.g. order confirmations, service updates) and
          marketing communications about our services and promoting our aims and ideals
        </li>
        <li>
          For corporate partners and funders, both current supporters and lapsed within a reasonable
          period, to send you administrative and marketing communications about our services and
          promoting our aims and ideals
        </li>
        <li>
          To undertake market and internet research to find new potential partners and to increase
          our understanding of current partners
        </li>
      </ul>

      <h2>How long we keep your information</h2>
      <p>
        We will retain your personal information only for as long as necessary, and to the extent
        needed to comply with our legal obligations, resolve disputes, and enforce our legal
        agreements and policies. We have determined different retention periods based on the data
        type and how it is used across our organisation. Usually this will not be for longer than 6
        years after your last interaction with us. For some types of data, such as recorded phone
        calls, this is a number of weeks. Personal data that no longer serves a purpose is securely
        disposed of or made anonymous so that you are no longer identifiable from it.
      </p>

      <h2>To organise events</h2>
      <ul>
        <li>
          To request feedback such as through surveys to meet more of communities&apos; needs and
          understand our impact
        </li>
        <li>
          Where we have a legal obligation such as processing payments or for health and safety
          reasons
        </li>
        <li>
          Whenever we process your personal information under the “legitimate interest” lawful basis
          we make sure that we consider your rights and interests. We will not process your personal
          information if we feel there is not a legitimate reason to do so. We will make it easy for
          you to opt-out of marketing communications and fundraising activities at any time if you
          wish. To opt out of such emails, click on the unsubscribe link at the bottom of our
          messages.
        </li>
      </ul>

      <h2>Sharing your information</h2>
      <p>
        We do not sell or trade your data. We may share your data in the following circumstances, to
        enable us to deliver our work and meet your expectations. Third parties will be required to
        use any personal information they receive only by our instructions and under a written
        agreement with us.
      </p>
      <p>Third parties and suppliers to provide our service:</p>

      <ul>
        <li>
          Various providers e.g. technical support, to enable us to efficiently run our services
        </li>
        <li>Consultants supporting specific projects</li>
        <li>Email software providers like MailingManager, to deliver compliant marketing</li>
        <li>Couriers and hauliers to manage the collection and delivery of products</li>
        <li>Employment references for job applications</li>
        <li>
          Third parties where there is a legal requirement, for example HMRC, law enforcement
          agencies and the Charity Commission
        </li>
        <li>
          Funders, corporate or sector partners and publicly, where you have given consent for your
          image or case study to be used for such purposes.
        </li>
        <li>
          Where we share your personal information with other companies or organisations, we do not
          permit them to send you marketing about them. We take care to ensure that they keep
        </li>
        <li>your personal information secure and delete it when it is no longer needed.</li>
      </ul>

      <h2>Keeping your information safe</h2>
      <p>
        The security of your data is important to us. We&apos;ve implemented physical, technical and
        organisational measures to protect the personal information we have under our control, both
        on and off-line, from improper access, use, alteration, destruction and loss. No method of
        transmission over the Internet, or method of storage is 100% secure. We use our best efforts
        and reasonable means to protect your personal information, and only keep it as long as is
        reasonable and necessary.
      </p>
      <p>
        We have put in place procedures to deal with any suspected data security breach and will
        notify you and any applicable regulator of a suspected breach where we are legally required
        to do so.
      </p>
      <p>
        Our website and servers are cloud-based. This means that it is possible that personal
        information we collect from you may be transferred to and stored in a location outside of
        the UK or the EEA. In those cases, we will comply fully with our legal obligations and take
        all steps necessary to ensure that your personal information is treated securely and in
        accordance with legislation.
      </p>
      <p>
        Please note that certain countries outside of the UK or the EEA have a lower standard of
        protection for personal information. Where your personal information is processed outside
        the UK or EEA in a country which does not offer an equivalent standard of protection to the
        UK or EEA, we will take all reasonable steps necessary to ensure that appropriate safeguards
        are in place. For instance, we may enter into the European Commission approved standard
        contractual clauses with such providers.
      </p>

      <h2>Your rights when we use your information</h2>
      <p>
        You have the following rights in relation to the personal information we hold about you:
      </p>
      <ul>
        <li>
          Request access to your personal information (commonly known as a “data subject access
          request”). This enables you to receive a copy of the personal information we hold about
          you and to check that we are lawfully processing it.
        </li>
        <li>Request correction of any inaccurate personal information that we hold about you.</li>
        <li>
          Request erasure of your personal information. This enables you to ask us to delete or
          remove personal information where there is no lawful reason to continue to process it.
        </li>
        <li>
          Object to processing of your personal information where we are relying on a legitimate
          interest and there is something about your particular situation which makes you want to
          object to processing on this ground.
        </li>
        <li>
          Request the restriction of processing of your personal information. This enables you to
          ask us to suspend the processing of personal information about you, for example if you
          want us to establish its accuracy or the reason for processing it.
        </li>
        <li>Request the transfer of your personal information to another party.</li>
        <li>
          Object to automated decision making. This is when an electronic system uses personal
          information to decide without human intervention. You have the right to request not to be
          subject to automated decisions that would have a significant impact on you
        </li>
        <li>
          You have the right to decide you do not want to receive marketing communications from us
        </li>
      </ul>

      <p>
        Please note that some of these rights only apply in certain circumstances and we may not be
        able to fulfil every request. We may also verify your identity so that we can evidence who
        is making the request.
      </p>

      <h2>Contact us</h2>

      <p>
        Our Managing Director is responsible for overseeing compliance with this privacy notice. If
        you have any questions about this notice, or wish to exercise your rights, please contact us
        at
      </p>

      <p>
        Email:{' '}
        <Link className={styles.email} to={Paths.COMMUNITY_EMAIL}>
          info@communityinspired.co.uk
        </Link>
      </p>
      <p>
        Phone: <Link to={Paths.PHONE}>01342 718679</Link>
      </p>
      <p>
        Community Inspired Ltd, Unit 2 Bulrushes Farm, Coombe Hill Road, East Grinstead, West Sussex
        RH19 4LZ
      </p>
      <p>Registered in England & Wales: 04573509</p>
      <p>Registered Office: 112 Broadwater Street West, Worthing, West Sussex BN14 9DJ</p>
      <p>
        You have the right to make a complaint to the Information Commissioner&apos;s Office (ICO),
        the UK supervisory authority for data protection issues.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this notice from time to time. We advise you to review this notice
        periodically. The latest version will always be available on our website with a clear “last
        updated” date displayed.
      </p>
    </FooterPage>
  );
};

export default PrivacyPolicy;
