import { FC } from 'react';
import styles from './YourLocalArea.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import Hat from '@/assets/yourLocalArea/Hat';
import Heart from '@/assets/yourLocalArea/Heart';
import Donate from '@/assets/yourLocalArea/Donate';
import Image from '@/components/Image/Image';
import hatImg from '@/assets/yourLocalArea/hat.png';
import heartImg from '@/assets/yourLocalArea/heart.png';
import donateImg from '@/assets/yourLocalArea/donate.png';

const YourLocalArea: FC = () => {
  const navigate = useNavigate();
  const location = useLocation() as { state: { postcode: string } };

  if (!(location.state && 'postcode' in location.state)) {
    return <Navigate to={Paths.FIND_YOUR_COMMUNITY} />;
  }

  return (
    <div className={styles.container}>
      <BackButton
        onClick={() => {
          navigate(-1);
        }}
        theme="blue"
      />
      <div className={styles.subContainer}>
        <h2>Your local area in {location.state.postcode.toUpperCase()}</h2>
        {tiles.map(({ icon, title, body, image, colour }) => {
          return (
            <div key={title} className={`${styles.tile} ${styles[colour]}`}>
              {icon}
              <div className={styles.content}>
                <h2 className={styles.header}>{title}</h2>
                <div>{body}</div>
              </div>
              {image}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const tiles = [
  {
    icon: <Hat />,
    title: "Find your child's school",
    body: 'Request or donate products',
    image: <Image alt="hat" image={hatImg} />,
    colour: 'darkBlue',
  },
  {
    icon: <Heart />,
    title: 'Find nearby charities',
    body: 'Find out what they stock or donate products',
    image: <Image alt="heart" image={heartImg} />,
    colour: 'midBlue',
  },
  {
    icon: <Donate />,
    title: 'Donate products',
    body: 'Support schools and charities in your area',
    image: <Image alt="donate" image={donateImg} />,
    colour: 'lightBlue',
  },
];

export default YourLocalArea;
