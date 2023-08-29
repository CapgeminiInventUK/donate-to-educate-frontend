import { ReactElement, FC } from 'react';
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
import Calender from '@/assets/tiles/Calender';
import Box from '@/assets/tiles/Box';
import Heart from '@/assets/tiles/Heart';
import Pupil from '@/assets/tiles/Child.webp';
import Teacher from '@/assets/tiles/Teacher.webp';
import Prefect from '@/assets/tiles/Prefect.webp';
import Image from '@components/Image/Image';
import { InfoTileProps } from '@/types/props';

const InfoTile: FC<InfoTileProps> = ({ colour }): ReactElement => {
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
      "Create your school's list of the items available, what you need and excess stock you are happy to share.",
      'Manage your lists, connect with local community groups and help every pupil get the items they need.',
      'Get support from national charities who can provide access to laptops, hygiene products and other products.',
    ],
    list: [
      {
        icon: <Money />,
        text: 'Get Donations',
      },
      {
        icon: <Dashboard />,
        text: 'Manage Products',
      },
      {
        icon: <Help />,
        text: 'Help Families',
      },
    ],
  },
  darkBlue: {
    title: 'A place for our supporters',
    image: Prefect,
    alt: 'School prefect',
    body: [
      'Local community groups can support schools and collect the items needed by pupils.',
      'Local businesses and supporters can donate funds to refurbish laptops, provide hygiene products and other essentials.',
      'Donate vital school stuff to improve the lives of children who need it.',
    ],
    list: [
      {
        icon: <Calender />,
        text: 'Volunteer time',
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
