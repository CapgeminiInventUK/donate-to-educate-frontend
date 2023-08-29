import LogoIconBlue from '@/assets/logo/LogoIconBlue';
import styles from './LetsHelpChildren.module.scss';

const LetsHelpChildren = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <LogoIconBlue className={styles.logo} />
      <h1>Let&apos;s help children thrive at school</h1>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
};

const paragraphs = [
  'It costs around £350 a year to buy essential school stuff for one child.',
  'While school children take time off school because they don’t have the things they need, every year over 100 million school items are sent to landfill.',
  'Donate to Educate will provide one place to help pupils get pre-loved things they need to be empowered in school, while supporting families and the planet.',
  "We'll connect communities, charities and schools to give pupils the things they need to feel good - creating a brighter future for children and communities.",
];

export default LetsHelpChildren;
