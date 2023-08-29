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

export interface InfoTileProps {
  colour: 'lightBlue' | 'midBlue' | 'darkBlue';
}

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
      "Get pre-loved school stuff for your child, so they're empowered to learn.",
      'Search online for clothes, sports gear and equipment at your school.',
      "Donate your things when you're done to help the next pupil and the planet.",
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
      "Create your school's shop-front to help families get the things they need.",
      'Manage your stock, list your products and give pre-loved items a new home.',
      'Connect with charities to get support and ask the community to donate the things you need.',
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
      'Support, donate or volunteer to make a difference to families across the country.',
      'Volunteer your time to make our services work for the community.',
      'Donate vital school stuff to improve the lives of children who need it.',
    ],
    list: [
      {
        icon: <Calender />,
        text: 'Volunteer time',
      },
      {
        icon: <Box />,
        text: 'Donate stuff',
      },
      {
        icon: <Heart />,
        text: 'Make a difference',
      },
    ],
  },
};

export default InfoTile;
