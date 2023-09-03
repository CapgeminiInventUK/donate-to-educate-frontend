import { FC } from 'react';
import styles from './InfoTile.module.scss';
import LightBlueLine from '@/assets/tiles/LightBlueLine';
import MidBlueLine from '@/assets/tiles/MidBlueLine';
import DarkBlueLine from '@/assets/tiles/DarkBlueLine';
import Rocket from '@/assets/tiles/Rocket';
import Planet from '@/assets/tiles/Planet';
import Present from '@/assets/tiles/Present';
import Money from '@/assets/tiles/Money';
import Dashboard from '@/assets/tiles/Dashboard';
import Help from '@/assets/tiles/Help';
import Box from '@/assets/tiles/Box';
import Heart from '@/assets/tiles/Heart';
import Pupil from '@/assets/tiles/Child.webp';
import Teacher from '@/assets/tiles/Teacher.webp';
import Supporters from '@/assets/tiles/Supporters.webp';
import Image from '@components/Image/Image';
import RoundArrows from '@/assets/tiles/RoundArrows';
import { InfoTileProps } from '@/types/props';

const InfoTile: FC<InfoTileProps> = ({ colour }) => {
  const { title, body, list, image, alt } = content[colour];

  return (
    <div className={`${styles.tile} ${styles[colour]}`}>
      <div className={styles.contentContainer}>
        <h1>{title}</h1>
        {getLine(colour)}
        {body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <ul>
          {list.map(({ text, icon }) => (
            <div key={text} className={styles.listItem}>
              <span className={styles.itemIcon}>{icon}</span>
              <li className={styles.itemText}>{text}</li>
            </div>
          ))}
        </ul>
      </div>
      <div className={styles.imageContainer}>
        <Image image={image} alt={alt} className={styles.image} />
      </div>
    </div>
  );
};

const getLine = (colour: 'lightBlue' | 'midBlue' | 'darkBlue'): JSX.Element => {
  switch (colour) {
    case 'lightBlue':
      return <LightBlueLine className={styles.line} />;
    case 'midBlue':
      return <MidBlueLine className={styles.line} />;
    case 'darkBlue':
      return <DarkBlueLine className={styles.line} />;
    default:
      throw new Error('Unexpected color');
  }
};

const content = {
  lightBlue: {
    title: 'A place for families',
    image: Pupil,
    alt: 'School pupil',
    body: [
      'Find new and pre-loved school essentials for your child.',
      'Search online for uniform, sportwear and equipment from your school or local community groups.',
      'Donate your things when you’re done to help the next pupil and the planet.',
    ],
    list: [
      {
        icon: <Rocket />,
        text: 'Empower pupils',
      },
      {
        icon: <Planet />,
        text: 'Help the planet',
      },
      {
        icon: <Present />,
        text: 'Give back',
      },
    ],
  },
  midBlue: {
    title: 'A place for schools',
    image: Teacher,
    alt: 'School teacher',
    body: [
      'Create a list of items that are available, items that are needed and excess items that you are happy to share.',
      'Connect with local community groups and help every pupil get the items they need.',
      'Get support from national charities who can donate laptops, hygiene products and other items.',
    ],
    list: [
      {
        icon: <Money />,
        text: 'Get donations',
      },
      {
        icon: <Dashboard />,
        text: 'Manage products',
      },
      {
        icon: <Help />,
        text: 'Help families',
      },
    ],
  },
  darkBlue: {
    title: 'A place for supporters',
    image: Supporters,
    alt: 'Supporters',
    body: [
      'Local community groups can support schools and collect the items that pupils need.',
      'Local businesses and volunteers can donate funds to refurbish laptops, provide hygiene products and other essentials.',
      'Donate vital school items to improve the lives of children who need them.',
    ],
    list: [
      {
        icon: <RoundArrows />,
        text: 'Connect with schools',
      },
      {
        icon: <Box />,
        text: 'Collect and donate',
      },
      {
        icon: <Heart />,
        text: 'Support schools and pupils',
      },
    ],
  },
};

export default InfoTile;
